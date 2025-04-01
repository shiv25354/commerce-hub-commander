
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { MOCK_ORDERS } from "@/components/orders/mockOrders";
import { toast } from "sonner";

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
      case 'ready-to-ship':
        return 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100';
      case 'out-for-delivery':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-100';
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

  const handleQuickAction = (orderId: string, action: string) => {
    let message = "";
    
    switch (action) {
      case "process":
        message = "Order marked as processing";
        break;
      case "ship":
        message = "Order marked as shipped";
        break;
      case "cancel":
        message = "Order has been cancelled";
        break;
      default:
        break;
    }
    
    if (message) {
      toast.success(message);
    }
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
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace(/-/g, ' ')}
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
                      <DropdownMenuItem asChild>
                        <Link to={`/orders/${order.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </Link>
                      </DropdownMenuItem>
                      {order.status === 'pending' && (
                        <DropdownMenuItem onClick={() => handleQuickAction(order.id, "process")}>
                          <Check className="mr-2 h-4 w-4" />
                          <span>Process Order</span>
                        </DropdownMenuItem>
                      )}
                      {(order.status === 'processing' || order.status === 'ready-to-ship') && (
                        <DropdownMenuItem onClick={() => handleQuickAction(order.id, "ship")}>
                          <Truck className="mr-2 h-4 w-4" />
                          <span>Mark as Shipped</span>
                        </DropdownMenuItem>
                      )}
                      {order.status !== 'cancelled' && order.status !== 'delivered' && (
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleQuickAction(order.id, "cancel")}
                        >
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
