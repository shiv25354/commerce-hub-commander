
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Search, 
  Eye, 
  Truck,
  X,
  Check,
  Calendar
} from "lucide-react";

// Mock data for orders
const MOCK_ORDERS = [
  {
    id: 'ORD-8721',
    customer: 'John Doe',
    email: 'john.doe@example.com',
    date: '2023-10-15T08:30:00',
    items: 5,
    total: 145.99,
    status: 'delivered',
    paymentStatus: 'paid',
    address: '123 Main St, New York, NY 10001',
  },
  {
    id: 'ORD-8720',
    customer: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    date: '2023-10-15T10:15:00',
    items: 2,
    total: 32.50,
    status: 'processing',
    paymentStatus: 'paid',
    address: '456 Park Ave, Boston, MA 02108',
  },
  {
    id: 'ORD-8719',
    customer: 'Michael Brown',
    email: 'michael.b@example.com',
    date: '2023-10-14T16:45:00',
    items: 8,
    total: 215.75,
    status: 'shipped',
    paymentStatus: 'paid',
    address: '789 Pine St, San Francisco, CA 94102',
  },
  {
    id: 'ORD-8718',
    customer: 'Emily Wilson',
    email: 'emily.w@example.com',
    date: '2023-10-14T12:30:00',
    items: 1,
    total: 24.99,
    status: 'pending',
    paymentStatus: 'unpaid',
    address: '101 Beach Rd, Miami, FL 33139',
  },
  {
    id: 'ORD-8717',
    customer: 'Robert Garcia',
    email: 'r.garcia@example.com',
    date: '2023-10-13T09:20:00',
    items: 4,
    total: 87.45,
    status: 'delivered',
    paymentStatus: 'paid',
    address: '222 Oak St, Chicago, IL 60601',
  },
  {
    id: 'ORD-8716',
    customer: 'Lisa Chen',
    email: 'lisa.chen@example.com',
    date: '2023-10-13T08:05:00',
    items: 3,
    total: 65.30,
    status: 'cancelled',
    paymentStatus: 'refunded',
    address: '333 Maple Ave, Seattle, WA 98101',
  },
  {
    id: 'ORD-8715',
    customer: 'David Kim',
    email: 'david.kim@example.com',
    date: '2023-10-12T14:10:00',
    items: 6,
    total: 154.80,
    status: 'delivered',
    paymentStatus: 'paid',
    address: '444 Elm St, Dallas, TX 75201',
  },
];

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(MOCK_ORDERS);

  useEffect(() => {
    document.title = "Order Management | Grocery Commerce Hub";
    
    // Filter orders based on search query
    if (searchQuery.trim() === "") {
      setFilteredOrders(MOCK_ORDERS);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      setFilteredOrders(
        MOCK_ORDERS.filter(
          (order) =>
            order.id.toLowerCase().includes(lowercaseQuery) ||
            order.customer.toLowerCase().includes(lowercaseQuery) ||
            order.email.toLowerCase().includes(lowercaseQuery) ||
            order.status.toLowerCase().includes(lowercaseQuery)
        )
      );
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Already handled in useEffect
  };

  const getOrderStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'processing':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const getPaymentStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'unpaid':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'refunded':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
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

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
        <p className="text-muted-foreground">
          Process, track, and manage customer orders
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Payment</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="font-medium">{order.id}</div>
                  <div className="text-xs text-muted-foreground md:hidden">
                    {formatDate(order.date)}
                  </div>
                  <div className="text-xs text-muted-foreground md:hidden">
                    {formatCurrency(order.total)} ({order.items} items)
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{formatDate(order.date)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{order.customer}</div>
                  <div className="text-xs text-muted-foreground">{order.email}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="font-medium">{formatCurrency(order.total)}</div>
                  <div className="text-xs text-muted-foreground">{order.items} items</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getOrderStatusBadgeColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <Badge variant="outline" className={getPaymentStatusBadgeColor(order.paymentStatus)}>
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </Badge>
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
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      {order.status === 'pending' && (
                        <DropdownMenuItem>
                          <Check className="mr-2 h-4 w-4" />
                          <span>Process Order</span>
                        </DropdownMenuItem>
                      )}
                      {(order.status === 'processing' || order.status === 'pending') && (
                        <DropdownMenuItem>
                          <Truck className="mr-2 h-4 w-4" />
                          <span>Mark as Shipped</span>
                        </DropdownMenuItem>
                      )}
                      {order.status !== 'cancelled' && order.status !== 'delivered' && (
                        <DropdownMenuItem className="text-red-600">
                          <X className="mr-2 h-4 w-4" />
                          <span>Cancel Order</span>
                        </DropdownMenuItem>
                      )}
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

export default Orders;
