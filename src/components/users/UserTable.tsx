
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserActions } from "./UserActions";
import { User, UserRole } from "@/types/user";

interface UserTableProps {
  users: User[];
  getRoleBadgeColor: (role: UserRole) => string;
  getStatusBadgeColor: (status: string) => string;
  formatDate: (dateString: string) => string;
}

export const UserTable = ({ 
  users, 
  getRoleBadgeColor, 
  getStatusBadgeColor, 
  formatDate 
}: UserTableProps) => {
  return (
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
          {users.map((user) => (
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
                <UserActions user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
