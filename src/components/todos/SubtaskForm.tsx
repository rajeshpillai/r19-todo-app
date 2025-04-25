'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useOptimistic } from 'react';

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

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? 'Saving...' : isEditing ? 'Update' : 'Add'} Subtask
    </Button>
  );
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

  const [optimisticState, addOptimisticSubtask] = useOptimistic(null, (prev, newSubtask: SubTask) => {
    // You can trigger preview render here if needed
    return newSubtask;
  });

  async function handleSubmit(prevState: FormState, formData: FormData): Promise<FormState> {
    const content = formData.get('content')?.toString().trim();

    if (!content) {
      return { error: 'Content is required' };
    }

    const newSubtask = {
      content,
      completed: false,
    };

    // Optimistic update (preview)
    addOptimisticSubtask(newSubtask);

    if (isEditing && initialValue) {
      updateSubtask(todoId, { ...initialValue, content });
    } else {
      addSubtask(todoId, newSubtask);
    }

    if (onSubmit) onSubmit();

    return {}; // Clear error
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

        <SubmitButton isEditing={isEditing} />
      </div>
    </form>
  );
}
