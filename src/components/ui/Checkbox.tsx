import { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Check } from 'lucide-react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({ 
  className, 
  label, 
  ref,
  ...props 
}: CheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            'peer h-4 w-4 shrink-0 rounded-sm border border-gray-300 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-600 data-[state=checked]:text-primary-foreground absolute opacity-0',
            className
          )}
          {...props}
        />
        <div
          className={cn(
            'h-4 w-4 shrink-0 rounded-sm border border-gray-300 flex items-center justify-center',
            props.checked && 'bg-primary-600 border-primary-600'
          )}
        >
          {props.checked && <Check className="h-3 w-3 text-white" />}
        </div>
      </div>
      {label && (
        <label
          htmlFor={props.id}
          className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
    </div>
  );
}