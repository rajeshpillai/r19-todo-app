export type User = {
  id: string;
  name: string;
  role: 'admin' | 'regular';
  avatar: string;
};

export type SubTask = {
  id: string;
  content: string;
  completed: boolean;
  createdAt: Date;
};

export type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  subtasks: SubTask[];
};