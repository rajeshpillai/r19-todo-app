import { useState } from 'react';
import { Users, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../types';
import { cn } from '../../utils/cn';

export function Sidebar() {
  const { users, currentUser, login } = useAuth();
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={cn(
        'bg-white border-r border-gray-200 transition-all duration-300 ease-in-out h-[calc(100vh-4rem)] overflow-y-auto sticky top-16',
        expanded ? 'w-64' : 'w-16'
      )}
    >
      <div className="p-4">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-100 mb-4"
        >
          {expanded && <span className="text-sm font-medium">Users</span>}
          <Users
            className={cn(
              'h-5 w-5 text-gray-500',
              !expanded && 'mx-auto'
            )}
          />
        </button>

        <div className="space-y-2">
          {users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              isActive={currentUser?.id === user.id}
              onClick={() => login(user.id)}
              expanded={expanded}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface UserItemProps {
  user: User;
  isActive: boolean;
  onClick: () => void;
  expanded: boolean;
}

function UserItem({ user, isActive, onClick, expanded }: UserItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center p-2 rounded-md transition-colors',
        isActive
          ? 'bg-primary-50 text-primary-700'
          : 'hover:bg-gray-100 text-gray-700'
      )}
    >
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="h-8 w-8 rounded-full"
        />
      ) : (
        <UserIcon className="h-8 w-8 p-1 rounded-full bg-gray-200 text-gray-500" />
      )}
      
      {expanded && (
        <div className="ml-3 text-left flex-1 truncate">
          <div className="text-sm font-medium">{user.name}</div>
          <div className="text-xs text-gray-500 capitalize">{user.role}</div>
        </div>
      )}
    </button>
  );
}