import { useState } from 'react';
import { ChevronDown, ChevronUp, Edit, Trash, Plus } from 'lucide-react';
import { useTodos } from '../../contexts/TodoContext';
import { Todo } from '../../types';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { SubtaskList } from './SubtaskList';
import { SubtaskForm } from './SubtaskForm';
import { TodoForm } from './TodoForm';
import { cn } from '../../utils/cn';
import { useAuth } from '../../contexts/AuthContext';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodoComplete, deleteTodo } = useTodos((state) => ({
    toggleTodoComplete: state.toggleTodoComplete,
    deleteTodo: state.deleteTodo,
  }));

  const { currentUser, users, isAdmin } = useAuth();

  const [showSubtasks, setShowSubtasks] = useState(false);
  const [showSubtaskForm, setShowSubtaskForm] = useState(false);
  const [editing, setEditing] = useState(false);

  const assignedUser = users.find((user) => user.id === todo.userId);
  const canEdit = isAdmin || (currentUser?.id === todo.userId);

  const handleToggle = () => {
    toggleTodoComplete(todo.id);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const toggleSubtasks = () => {
    setShowSubtasks(!showSubtasks);
  };

  const toggleSubtaskForm = () => {
    setShowSubtaskForm(!showSubtaskForm);
  };

  const subtasksCompleted = todo.subtasks.filter((subtask) => subtask.completed).length;
  const totalSubtasks = todo.subtasks.length;
  const hasSubtasks = totalSubtasks > 0;

  if (editing) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 hover:shadow-md transition-shadow animate-scale-in">
        <TodoForm
          initialValues={todo}
          onCancel={() => setEditing(false)}
          onSubmit={() => setEditing(false)}
          isEditing
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 hover:shadow-md transition-shadow",
        todo.completed && "bg-gray-50 border-gray-100"
      )}
    >
      <div className="flex items-start">
        <div className="pt-1">
          <Checkbox checked={todo.completed} onChange={handleToggle} className="mt-1" />
        </div>

        <div className="ml-3 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3
                className={cn(
                  "text-lg font-medium text-gray-900",
                  todo.completed && "text-gray-500 line-through"
                )}
              >
                {todo.title}
              </h3>

              <p
                className={cn(
                  "text-sm text-gray-600 mt-1",
                  todo.completed && "text-gray-400"
                )}
              >
                {todo.description}
              </p>

              <div className="flex items-center mt-2 space-x-2">
                {assignedUser && (
                  <div className="flex items-center">
                    <img
                      src={assignedUser.avatar}
                      alt={assignedUser.name}
                      className="h-5 w-5 rounded-full mr-1"
                    />
                    <span className="text-xs text-gray-500">{assignedUser.name}</span>
                  </div>
                )}

                <span className="text-xs text-gray-500">
                  {new Date(todo.createdAt).toLocaleDateString()}
                </span>

                {hasSubtasks && (
                  <span className="text-xs text-gray-500">
                    {subtasksCompleted}/{totalSubtasks} subtasks
                  </span>
                )}
              </div>
            </div>

            {canEdit && (
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditing(true)}
                  className="text-gray-500 hover:text-primary-600"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="text-gray-500 hover:text-error-600"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Show/Hide Subtasks for Everyone */}
          {hasSubtasks && (
            <div className="mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSubtasks}
                className="text-gray-500 text-sm py-1 px-2 hover:bg-gray-100"
              >
                {showSubtasks ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Hide Subtasks
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Show Subtasks
                  </>
                )}
              </Button>

              {showSubtasks && (
                <div className="mt-2 pl-2 border-l-2 border-gray-200">
                  <SubtaskList todoId={todo.id} subtasks={todo.subtasks} />
                </div>
              )}
            </div>
          )}

          {/* Add Subtask for Everyone */}
          <div className="mt-3">
            {showSubtaskForm ? (
              <div className="mt-2 pl-2 border-l-2 border-gray-200 animate-slide-down">
                <SubtaskForm todoId={todo.id} onCancel={toggleSubtaskForm} />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSubtaskForm}
                className="text-gray-500 text-sm py-1 px-2 hover:bg-gray-100"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Subtask
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
