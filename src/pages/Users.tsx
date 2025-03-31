
import { useState, useEffect } from "react";
import { UserTable } from "@/components/users/UserTable";
import { UserSearch } from "@/components/users/UserSearch";
import { MOCK_USERS } from "@/data/mockUsers";
import { getRoleBadgeColor, getStatusBadgeColor, formatDate } from "@/utils/userUtils";
import { useAuth } from "@/contexts/AuthContext";

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage administrators, vendors, and delivery personnel
        </p>
      </div>

      <UserSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      <UserTable 
        users={filteredUsers}
        getRoleBadgeColor={getRoleBadgeColor}
        getStatusBadgeColor={getStatusBadgeColor}
        formatDate={formatDate}
      />
    </div>
  );
};

export default Users;
