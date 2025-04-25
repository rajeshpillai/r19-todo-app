import { ReactNode, useState, use } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import { Todo, SubTask } from '../types';
import { todos as initialTodos } from '../lib/data';
import { useAuth } from './AuthContext';

interface TodoContextType {
  todos: Todo[];
  filteredTodos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'subtasks'>) => Promise<void>;
  updateTodo: (todo: Todo) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  addSubtask: (todoId: string, subtask: Omit<SubTask, 'id' | 'createdAt'>) => Promise<void>;
  updateSubtask: (todoId: string, subtask: SubTask) => Promise<void>;
  deleteSubtask: (todoId: string, subtaskId: string) => Promise<void>;
  toggleTodoComplete: (id: string) => Promise<void>;
  toggleSubtaskComplete: (todoId: string, subtaskId: string) => Promise<void>;
}

export const TodoContext = createContext<TodoContextType>({} as TodoContextType);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const { currentUser, isAdmin } = useAuth();

  // Only show todos that belong to the current user, or all todos if admin
  const filteredTodos = todos.filter((todo) => {
    if (!currentUser) return false;
    return isAdmin || todo.userId === currentUser.id;
  });

  const addTodo = async (todo: Omit<Todo, 'id' | 'createdAt' | 'subtasks'>) => {
    const newTodo: Todo = {
      ...todo,
      id: Date.now().toString(),
      createdAt: new Date(),
      subtasks: [],
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const updateTodo = async (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const deleteTodo = async (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const addSubtask = async (todoId: string, subtask: Omit<SubTask, 'id' | 'createdAt'>) => {
    const newSubtask: SubTask = {
      ...subtask,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            subtasks: [...todo.subtasks, newSubtask],
          };
        }
        return todo;
      })
    );
  };

  const updateSubtask = async (todoId: string, updatedSubtask: SubTask) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            subtasks: todo.subtasks.map((subtask) =>
              subtask.id === updatedSubtask.id ? updatedSubtask : subtask
            ),
          };
        }
        return todo;
      })
    );
  };

  const deleteSubtask = async (todoId: string, subtaskId: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            subtasks: todo.subtasks.filter((subtask) => subtask.id !== subtaskId),
          };
        }
        return todo;
      })
    );
  };

  const toggleTodoComplete = async (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const toggleSubtaskComplete = async (todoId: string, subtaskId: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            subtasks: todo.subtasks.map((subtask) => {
              if (subtask.id === subtaskId) {
                return {
                  ...subtask,
                  completed: !subtask.completed,
                };
              }
              return subtask;
            }),
          };
        }
        return todo;
      })
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        addSubtask,
        updateSubtask,
        deleteSubtask,
        toggleTodoComplete,
        toggleSubtaskComplete,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos<T>(selector: (state: TodoContextType) => T): T {
  return useContextSelector(TodoContext, selector);
}