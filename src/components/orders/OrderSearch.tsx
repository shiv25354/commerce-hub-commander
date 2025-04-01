
import { useState, useEffect, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { filterOrders } from "./OrderUtils";

interface OrderSearchProps {
  onSearchResults: (orders: any[]) => void;
}

const OrderSearch = ({ onSearchResults }: OrderSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filteredOrders = filterOrders(searchQuery);
    onSearchResults(filteredOrders);
  }, [searchQuery, onSearchResults]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // Already handled in useEffect
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full sm:w-auto sm:min-w-[300px]">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search by order ID, customer..."
        className="pl-8 w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};

export default OrderSearch;
