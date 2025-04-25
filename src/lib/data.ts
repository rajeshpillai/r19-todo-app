import { User, Todo } from '../types';

// Sample data for our application
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'John Doe',
    role: 'regular',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Jane Smith',
    role: 'regular',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    name: 'Bob Johnson',
    role: 'regular',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
];

export const todos: Todo[] = [
  {
    id: '1',
    title: 'Complete Project Proposal',
    description: 'Finish the proposal for the new client project',
    completed: false,
    userId: '1',
    createdAt: new Date('2023-04-10'),
    subtasks: [
      {
        id: '1-1',
        content: 'Research competition',
        completed: true,
        createdAt: new Date('2023-04-10'),
      },
      {
        id: '1-2',
        content: 'Draft project timeline',
        completed: false,
        createdAt: new Date('2023-04-10'),
      },
      {
        id: '1-3',
        content: 'Create budget estimate',
        completed: false,
        createdAt: new Date('2023-04-10'),
      },
    ],
  },
  {
    id: '2',
    title: 'Review Code PR',
    description: 'Review pull request for the authentication feature',
    completed: true,
    userId: '2',
    createdAt: new Date('2023-04-11'),
    subtasks: [
      {
        id: '2-1',
        content: 'Check for security issues',
        completed: true,
        createdAt: new Date('2023-04-11'),
      },
      {
        id: '2-2',
        content: 'Verify test coverage',
        completed: true,
        createdAt: new Date('2023-04-11'),
      },
    ],
  },
  {
    id: '3',
    title: 'Prepare for Client Meeting',
    description: 'Gather materials for tomorrow\'s client meeting',
    completed: false,
    userId: '3',
    createdAt: new Date('2023-04-12'),
    subtasks: [
      {
        id: '3-1',
        content: 'Update slide deck',
        completed: false,
        createdAt: new Date('2023-04-12'),
      },
      {
        id: '3-2',
        content: 'Review project milestones',
        completed: true,
        createdAt: new Date('2023-04-12'),
      },
      {
        id: '3-3',
        content: 'Prepare demo environment',
        completed: false,
        createdAt: new Date('2023-04-12'),
      },
    ],
  },
  {
    id: '4',
    title: 'Update Documentation',
    description: 'Update the user guide with new features',
    completed: false,
    userId: '2',
    createdAt: new Date('2023-04-13'),
    subtasks: [
      {
        id: '4-1',
        content: 'Take screenshots',
        completed: true,
        createdAt: new Date('2023-04-13'),
      },
      {
        id: '4-2',
        content: 'Update API reference',
        completed: false,
        createdAt: new Date('2023-04-13'),
      },
    ],
  },
  {
    id: '5',
    title: 'Weekly Team Meeting',
    description: 'Prepare agenda for the weekly team meeting',
    completed: true,
    userId: '1',
    createdAt: new Date('2023-04-14'),
    subtasks: [
      {
        id: '5-1',
        content: 'Collect status updates',
        completed: true,
        createdAt: new Date('2023-04-14'),
      },
      {
        id: '5-2',
        content: 'Identify blockers',
        completed: true,
        createdAt: new Date('2023-04-14'),
      },
    ],
  },
  {
    id: '6',
    title: 'Design User Interface',
    description: 'Create mockups for the new feature',
    completed: false,
    userId: '4',
    createdAt: new Date('2023-04-15'),
    subtasks: [
      {
        id: '6-1',
        content: 'Research design trends',
        completed: true,
        createdAt: new Date('2023-04-15'),
      },
      {
        id: '6-2',
        content: 'Create wireframes',
        completed: false,
        createdAt: new Date('2023-04-15'),
      },
      {
        id: '6-3',
        content: 'Design high-fidelity mockups',
        completed: false,
        createdAt: new Date('2023-04-15'),
      },
    ],
  },
];