'use client';

import { useFormState } from 'react-dom';
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

interface FormState {
  error?: string;
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

  // Form action for React 19
  async function handleSubmit(prevState: FormState, formData: FormData): Promise<FormState> {
    const content = formData.get('content')?.toString().trim();

    if (!content) {
      return { error: 'Content is required' };
    }

    if (isEditing && initialValue) {
      updateSubtask(todoId, { ...initialValue, content });
    } else {
      addSubtask(todoId, { content, completed: false });
    }

    // Trigger onSubmit after success
    if (onSubmit) onSubmit();

    return {}; // no error
  }

  const [formState, formAction] = useFormState(handleSubmit, {});

  return (
    <form action={formAction} className="space-y-2">
      <Input
        name="content"
        defaultValue={initialValue?.content}
        placeholder="Enter subtask"
        fullWidth
        error={formState?.error}
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
