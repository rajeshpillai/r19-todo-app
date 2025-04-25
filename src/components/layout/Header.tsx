import { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

export function Header() {
  const { currentUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary-600 font-bold text-lg">TodoMaster</span>
            </Link>
          </div>

          {currentUser ? (
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={currentUser.avatar}
                    alt={currentUser.name}
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {currentUser.name}
                  </span>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {currentUser.role}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-gray-500"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex sm:items-center">
              <span className="text-sm text-gray-500">Please select a user</span>
            </div>
          )}

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && currentUser && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1 border-t border-gray-200">
            <div className="flex items-center px-4 py-2">
              <img
                className="h-8 w-8 rounded-full"
                src={currentUser.avatar}
                alt={currentUser.name}
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                {currentUser.name}
              </span>
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {currentUser.role}
              </span>
            </div>
            <div className="px-4 py-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-gray-500 w-full justify-start"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}