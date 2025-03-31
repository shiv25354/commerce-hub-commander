
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface OrderItem {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  date: string;
  total: string;
  items: number;
}

const MOCK_ORDERS: OrderItem[] = [
  {
    id: 'ORD-001',
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=3B82F6&color=fff',
    },
    status: 'delivered',
    date: '2 hours ago',
    total: '$128.00',
    items: 3,
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10B981&color=fff',
    },
    status: 'processing',
    date: '5 hours ago',
    total: '$85.50',
    items: 2,
  },
  {
    id: 'ORD-003',
    customer: {
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Brown&background=8B5CF6&color=fff',
    },
    status: 'pending',
    date: '8 hours ago',
    total: '$215.00',
    items: 5,
  },
  {
    id: 'ORD-004',
    customer: {
      name: 'Emily Wilson',
      email: 'e.wilson@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Emily+Wilson&background=F59E0B&color=fff',
    },
    status: 'cancelled',
    date: '1 day ago',
    total: '$42.99',
    items: 1,
  },
  {
    id: 'ORD-005',
    customer: {
      name: 'Robert Garcia',
      email: 'rob.garcia@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Robert+Garcia&background=EF4444&color=fff',
    },
    status: 'delivered',
    date: '1 day ago',
    total: '$175.25',
    items: 4,
  },
];

export function RecentOrders() {
  const getStatusColor = (status: OrderItem['status']): string => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'processing':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'delivered':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return '';
    }
  };

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-3">
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>
          You have {MOCK_ORDERS.length} orders today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-lg border p-3 text-sm"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={order.customer.avatar}
                    alt={order.customer.name}
                  />
                  <AvatarFallback>
                    {order.customer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="font-medium">{order.customer.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.customer.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:grid gap-1 text-right">
                  <p className="font-medium">{order.total}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.items} items
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn("capitalize", getStatusColor(order.status))}
                >
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
