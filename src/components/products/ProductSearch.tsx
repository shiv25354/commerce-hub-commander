
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProductSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: FormEvent) => void;
}

export const ProductSearch = ({ searchQuery, setSearchQuery, handleSearch }: ProductSearchProps) => {
  return (
    <form onSubmit={handleSearch} className="relative w-full sm:w-auto sm:min-w-[300px]">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search products..."
        className="pl-8 w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};
