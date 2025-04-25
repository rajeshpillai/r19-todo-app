import { Suspense, use } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TodoProvider } from './contexts/TodoContext';
import { MainLayout } from './layout/MainLayout';
import { HomePage } from './pages/HomePage';

// Create router with data router API
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div className="p-8">Loading todos...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

function App() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <AuthProvider>
        <TodoProvider>
          <RouterProvider router={router} />
        </TodoProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;