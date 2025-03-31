
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, UserCheck, UserX, MoreHorizontal } from "lucide-react";
import { User } from "@/types/user";

interface UserActionsProps {
  user: User;
}

export const UserActions = ({ user }: UserActionsProps) => {
  return (
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
  );
};
