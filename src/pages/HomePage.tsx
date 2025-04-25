import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { TodoList } from '../components/todos/TodoList';
import { TodoForm } from '../components/todos/TodoForm';
import { useAuth } from '../contexts/AuthContext';

export function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const { currentUser } = useAuth();
  
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {currentUser ? (
            <>
              {currentUser.role === 'admin' ? 'All' : 'My'} Tasks
            </>
          ) : (
            'Tasks'
          )}
        </h1>
        
        {currentUser && (
          <Button
            onClick={toggleForm}
            className="flex items-center"
          >
            {showForm ? (
              <>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                New Task
              </>
            )}
          </Button>
        )}
      </div>
      
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 animate-slide-down">
          <TodoForm onSubmit={toggleForm} onCancel={toggleForm} />
        </div>
      )}
      
      <TodoList />
    </div>
  );
}