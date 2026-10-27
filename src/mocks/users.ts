export const mockUsers = [
  {
    id: 'user-1',
    name: 'Ana Lima',
    email: 'ana.lima@pulsecompany.com',
    role: 'admin',
    avatar: null,
    department: 'Marketing',
    joinedAt: '2021-03-15',
    lastActive: '2024-02-21',
    permissions: ['read', 'write', 'delete', 'admin'],
  },
  {
    id: 'user-2',
    name: 'Carlos Mendes',
    email: 'carlos.mendes@pulsecompany.com',
    role: 'editor',
    avatar: null,
    department: 'Growth',
    joinedAt: '2022-07-20',
    lastActive: '2024-02-20',
    permissions: ['read', 'write'],
  },
  {
    id: 'user-3',
    name: 'Fernanda Costa',
    email: 'fernanda.costa@pulsecompany.com',
    role: 'viewer',
    avatar: null,
    department: 'Produto',
    joinedAt: '2023-01-10',
    lastActive: '2024-02-19',
    permissions: ['read'],
  },
];

export const mockCurrentUser = mockUsers[0];
