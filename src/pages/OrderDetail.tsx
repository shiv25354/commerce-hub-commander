
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Package, Truck, Check, Clock, AlertCircle, ArrowLeft } from "lucide-react";
import { MOCK_ORDERS } from "@/components/orders/mockOrders";
import { OrderStatusWorkflow } from "@/components/orders/OrderStatusWorkflow";
import { toast } from "sonner";

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const foundOrder = MOCK_ORDERS.find(o => o.id === orderId);
    
    if (foundOrder) {
      document.title = `Order ${foundOrder.id} | Grocery Commerce Hub`;
      setOrder(foundOrder);
    } else {
      toast.error("Order not found");
      navigate("/orders");
    }
  }, [orderId, navigate]);

  if (!order) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold">Loading order details...</h2>
        </div>
      </div>
    );
  }

  const handleUpdateStatus = (newStatus: string) => {
    setOrder({ ...order, status: newStatus });
    toast.success(`Order status updated to ${newStatus}`);
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

  const getStatusBadgeColor = (status: string) => {
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

  const mockOrderItems = [
    {
      id: 1,
      name: 'Organic Apples',
      quantity: 2,
      price: 5.99,
      total: 11.98
    },
    {
      id: 2,
      name: 'Whole Grain Bread',
      quantity: 1,
      price: 3.49,
      total: 3.49
    },
    {
      id: 3,
      name: 'Organic Milk',
      quantity: 1,
      price: 4.99,
      total: 4.99
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/orders')}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Order Details</h1>
          <p className="text-muted-foreground">
            Manage order #{order.id}
          </p>
        </div>
        <Badge variant="outline" className={getStatusBadgeColor(order.status)}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Customer</h3>
              <p>{order.customer}</p>
              <p className="text-sm text-muted-foreground">{order.email}</p>
            </div>
            <div>
              <h3 className="font-medium">Shipping Address</h3>
              <p className="text-sm">{order.address}</p>
            </div>
            <div>
              <h3 className="font-medium">Order Date</h3>
              <div className="flex items-center gap-1 text-sm">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{formatDate(order.date)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Fulfillment</CardTitle>
            <CardDescription>Update the order status</CardDescription>
          </CardHeader>
          <CardContent>
            <OrderStatusWorkflow 
              currentStatus={order.status} 
              onUpdateStatus={handleUpdateStatus} 
            />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="items">
        <TabsList>
          <TabsTrigger value="items">Order Items</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Information</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>
        <TabsContent value="items" className="border rounded-md p-4 mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrderItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Separator className="my-4" />
          <div className="flex justify-end">
            <div className="space-y-1 text-right">
              <div className="flex justify-between gap-10">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>{formatCurrency(20.46)}</span>
              </div>
              <div className="flex justify-between gap-10">
                <span className="text-muted-foreground">Shipping:</span>
                <span>{formatCurrency(5.00)}</span>
              </div>
              <div className="flex justify-between gap-10">
                <span className="text-muted-foreground">Tax:</span>
                <span>{formatCurrency(1.64)}</span>
              </div>
              <div className="flex justify-between gap-10 text-lg font-medium">
                <span>Total:</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="delivery" className="border rounded-md p-4 mt-2">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Delivery Method</h3>
              <p className="text-sm">Standard Delivery (1-3 business days)</p>
            </div>
            <div>
              <h3 className="font-medium">Tracking Information</h3>
              {order.status === 'shipped' || order.status === 'out-for-delivery' || order.status === 'delivered' ? (
                <div className="text-sm">
                  <p className="mb-1">Tracking Number: TRACK-12345</p>
                  <Button variant="outline" size="sm">
                    <Truck className="h-4 w-4 mr-2" />
                    Track Package
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Tracking information will be available once the order ships</p>
              )}
            </div>
            <div>
              <h3 className="font-medium">Delivery Address</h3>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <span>{order.address}</span>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="payment" className="border rounded-md p-4 mt-2">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Payment Method</h3>
              <p className="text-sm">Credit Card (ending in 4242)</p>
            </div>
            <div>
              <h3 className="font-medium">Payment Status</h3>
              <Badge variant="outline" className={order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
              </Badge>
            </div>
            <div>
              <h3 className="font-medium">Billing Address</h3>
              <p className="text-sm">{order.address}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderDetail;
