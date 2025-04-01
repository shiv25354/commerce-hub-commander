
import { Link } from "react-router-dom";
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
  Eye, 
  Truck,
  X,
  Check,
  Calendar
} from "lucide-react";
import { toast } from "sonner";
import { getOrderStatusBadgeColor, getPaymentStatusBadgeColor, formatDate, formatCurrency } from "./OrderUtils";

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: number;
  total: number;
  status: string;
  paymentStatus: string;
  address: string;
}

interface OrderTableProps {
  orders: Order[];
}

const OrderTable = ({ orders }: OrderTableProps) => {
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
          {orders.map((order) => (
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
  );
};

export default OrderTable;
