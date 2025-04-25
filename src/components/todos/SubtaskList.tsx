import { SubTask } from '../../types';
import { SubtaskItem } from './SubtaskItem';

interface SubtaskListProps {
  todoId: string;
  subtasks: SubTask[];
}

export function SubtaskList({ todoId, subtasks }: SubtaskListProps) {
  if (subtasks.length === 0) {
    return <p className="text-sm text-gray-500 py-2">No subtasks yet</p>;
  }
  
  // Sort subtasks: incomplete first, then by date
  const sortedSubtasks = [...subtasks].sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  return (
    <div className="space-y-2">
      {sortedSubtasks.map((subtask) => (
        <SubtaskItem 
          key={subtask.id} 
          todoId={todoId} 
          subtask={subtask} 
        />
      ))}
    </div>
  );
}