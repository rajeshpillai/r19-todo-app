import { useState, FormEvent } from 'react';
import { useTodos } from '../../contexts/TodoContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { SubTask } from '../../types';

interface SubtaskFormProps {
  todoId: string;
  initialValue?: SubTask;
  onSubmit?: () => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

export function SubtaskForm({ 
  todoId, 
  initialValue, 
  onSubmit, 
  onCancel,
  isEditing = false
}: SubtaskFormProps) {
  const { addSubtask, updateSubtask } = useTodos((state) => ({
    addSubtask: state.addSubtask,
    updateSubtask: state.updateSubtask,
  }));
  
  const [content, setContent] = useState(initialValue?.content || '');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Content is required');
      return;
    }
    
    if (isEditing && initialValue) {
      updateSubtask(todoId, {
        ...initialValue,
        content
      });
    } else {
      addSubtask(todoId, {
        content,
        completed: false
      });
    }
    
    setContent('');
    
    if (onSubmit) {
      onSubmit();
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter subtask"
        fullWidth
        error={error && !content.trim() ? error : ''}
      />
      
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        
        <Button type="submit" size="sm">
          {isEditing ? 'Update' : 'Add'} Subtask
        </Button>
      </div>
    </form>
  );
}