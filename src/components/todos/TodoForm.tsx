import { useFormState } from 'react-dom';
import { useTodos } from '../../contexts/TodoContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Todo } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useCallback } from 'react';

interface TodoFormProps {
  initialValues?: Todo;
  onSubmit?: () => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

export function TodoForm({
  initialValues,
  onSubmit,
  onCancel,
  isEditing = false
}: TodoFormProps) {
  const { addTodo, updateTodo } = useTodos((state) => ({
    addTodo: state.addTodo,
    updateTodo: state.updateTodo,
  }));

  const { currentUser, users, isAdmin } = useAuth();

  const action = useCallback(async (prevState: any, formData: FormData) => {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const userId = formData.get('userId') as string || currentUser?.id;

    if (!title?.trim()) {
      return { error: 'Title is required' };
    }

    if (!userId) {
      return { error: 'User is required' };
    }

    if (isEditing && initialValues) {
      updateTodo({
        ...initialValues,
        title,
        description,
        userId
      });
    } else {
      addTodo({
        title,
        description,
        completed: false,
        userId
      });
    }

    if (onSubmit) {
      onSubmit();
    }

    return { success: true };
  }, [addTodo, updateTodo, isEditing, initialValues, currentUser?.id, onSubmit]);

  const [formState, formAction] = useFormState(action, {});

  function SubmitButton() {
    return (
      <Button type="submit">
        {isEditing ? 'Update' : 'Add'} Todo
      </Button>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {formState?.error && (
        <p className="text-red-600 text-sm">{formState.error}</p>
      )}

      <Input
        label="Title"
        name="title"
        defaultValue={initialValues?.title}
        placeholder="Enter todo title"
        fullWidth
      />

      <Textarea
        label="Description"
        name="description"
        defaultValue={initialValues?.description}
        placeholder="Enter todo description"
        fullWidth
      />

      {isAdmin && (
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Assign to
          </label>
          <select
            name="userId"
            defaultValue={initialValues?.userId || currentUser?.id}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <SubmitButton />
      </div>
    </form>
  );
}
