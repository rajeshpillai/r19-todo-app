import { useState } from 'react';
import { Edit, Trash } from 'lucide-react';
import { useTodos } from '../../contexts/TodoContext';
import { SubTask } from '../../types';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { SubtaskForm } from './SubtaskForm';
import { cn } from '../../utils/cn';
import { useAuth } from '../../contexts/AuthContext';

interface SubtaskItemProps {
  todoId: string;
  subtask: SubTask;
}

export function SubtaskItem({ todoId, subtask }: SubtaskItemProps) {
  const { toggleSubtaskComplete, deleteSubtask } = useTodos((state) => ({
    toggleSubtaskComplete: state.toggleSubtaskComplete,
    deleteSubtask: state.deleteSubtask,
  }));
  
  const { currentUser, isAdmin } = useAuth();
  const [editing, setEditing] = useState(false);
  
  const handleToggle = () => {
    toggleSubtaskComplete(todoId, subtask.id);
  };
  
  const handleDelete = () => {
    deleteSubtask(todoId, subtask.id);
  };
  
  if (editing) {
    return (
      <div className="animate-fade-in">
        <SubtaskForm 
          todoId={todoId} 
          initialValue={subtask} 
          onCancel={() => setEditing(false)} 
          onSubmit={() => setEditing(false)}
          isEditing
        />
      </div>
    );
  }
  
  const canEdit = isAdmin || currentUser?.id === todoId.split('-')[0];
  
  return (
    <div className="flex items-start py-2 group">
      <div className="pt-0.5">
        <Checkbox 
          checked={subtask.completed} 
          onChange={handleToggle} 
        />
      </div>
      
      <div className="ml-3 flex-1">
        <p 
          className={cn(
            "text-sm text-gray-700",
            subtask.completed && "text-gray-400 line-through"
          )}
        >
          {subtask.content}
        </p>
      </div>
      
      {canEdit && (
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditing(true)}
            className="p-1 text-gray-400 hover:text-primary-600"
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-error-600"
          >
            <Trash className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
}