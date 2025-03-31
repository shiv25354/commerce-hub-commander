
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { FormEvent } from "react";

interface UserSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: FormEvent) => void;
}

export const UserSearch = ({ searchQuery, setSearchQuery, handleSearch }: UserSearchProps) => {
  return (
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
  );
};
