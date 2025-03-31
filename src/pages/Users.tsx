
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  UserCheck,
  UserX
} from "lucide-react";
import { useAuth, UserRole } from "@/contexts/AuthContext";

// Mock data for users
const MOCK_USERS = [
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

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(MOCK_USERS);
  const { user } = useAuth();
  
  useEffect(() => {
    document.title = "User Management | Grocery Commerce Hub";
    
    // Filter users based on search query
    if (searchQuery.trim() === "") {
      setFilteredUsers(MOCK_USERS);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      setFilteredUsers(
        MOCK_USERS.filter(
          (user) =>
            user.name.toLowerCase().includes(lowercaseQuery) ||
            user.email.toLowerCase().includes(lowercaseQuery) ||
            user.role.toLowerCase().includes(lowercaseQuery)
        )
      );
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Already handled in useEffect
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-dashboard-blue text-white hover:bg-dashboard-blue';
      case 'vendor':
        return 'bg-dashboard-green text-white hover:bg-dashboard-green';
      case 'delivery':
        return 'bg-dashboard-yellow text-white hover:bg-dashboard-yellow';
      default:
        return 'bg-gray-500 text-white hover:bg-gray-500';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800 hover:bg-green-100'
      : 'bg-red-100 text-red-800 hover:bg-red-100';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage administrators, vendors, and delivery personnel
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearch} className="relative w-full sm:w-auto sm:min-w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <Button className="bg-dashboard-blue hover:bg-dashboard-blue/90">
          <Plus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Last Login</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getRoleBadgeColor(user.role)} variant="secondary">
                    {user.role.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusBadgeColor(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDate(user.lastLogin)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      {user.status === 'active' ? (
                        <DropdownMenuItem>
                          <UserX className="mr-2 h-4 w-4" />
                          <span>Deactivate</span>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>
                          <UserCheck className="mr-2 h-4 w-4" />
                          <span>Activate</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
