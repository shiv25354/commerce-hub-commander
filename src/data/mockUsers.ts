
import { User, UserRole } from "@/types/user";

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'admin' as UserRole,
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=1E40AF&color=fff',
    lastLogin: '2023-10-15T08:30:00'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'vendor' as UserRole,
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10B981&color=fff',
    lastLogin: '2023-10-14T14:45:00'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    role: 'vendor' as UserRole,
    status: 'inactive',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Brown&background=8B5CF6&color=fff',
    lastLogin: '2023-09-28T10:15:00'
  },
  {
    id: '4',
    name: 'Emily Wilson',
    email: 'emily.wilson@example.com',
    role: 'delivery' as UserRole,
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Wilson&background=F59E0B&color=fff',
    lastLogin: '2023-10-15T09:20:00'
  },
  {
    id: '5',
    name: 'Robert Garcia',
    email: 'robert.garcia@example.com',
    role: 'delivery' as UserRole,
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Robert+Garcia&background=EF4444&color=fff',
    lastLogin: '2023-10-14T16:30:00'
  },
  {
    id: '6',
    name: 'Lisa Chen',
    email: 'lisa.chen@example.com',
    role: 'admin' as UserRole,
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Lisa+Chen&background=1E40AF&color=fff',
    lastLogin: '2023-10-12T11:45:00'
  },
  {
    id: '7',
    name: 'David Kim',
    email: 'david.kim@example.com',
    role: 'vendor' as UserRole,
    status: 'inactive',
    avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=10B981&color=fff',
    lastLogin: '2023-09-10T08:00:00'
  },
];
