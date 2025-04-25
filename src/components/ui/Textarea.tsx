import { TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export function Textarea({ 
  className, 
  label, 
  error, 
  fullWidth = false, 
  ref,
  ...props 
}: TextareaProps) {
  return (
    <div className={cn('flex flex-col space-y-1.5', fullWidth && 'w-full')}>
      {label && (
        <label
          htmlFor={props.id}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={cn(
          'flex min-h-20 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-error-500',
          fullWidth && 'w-full',
          error && 'border-error-500',
          className
        )}
        aria-invalid={!!error}
        {...props}
      />
      {error && <span className="text-xs text-error-500">{error}</span>}
    </div>
  );
}