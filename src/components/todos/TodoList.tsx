import { useMemo } from 'react';
import { useTodos } from '../../contexts/TodoContext';
import { TodoItem } from './TodoItem';
import { useAuth } from '../../contexts/AuthContext';

export function TodoList() {
  const { filteredTodos } = useTodos(state => ({
    filteredTodos: state.filteredTodos
  }));

  const { currentUser } = useAuth();

  // Sort todos: incomplete first, then by date
  const sortedTodos = useMemo(() =>
    [...filteredTodos].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }),
    [filteredTodos]
  );

  if (!currentUser) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Please select a user to view todos</p>
      </div>
    );
  }

  if (sortedTodos.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No todos found</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-200px)] overflow-auto space-y-4 px-2">
      {sortedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
