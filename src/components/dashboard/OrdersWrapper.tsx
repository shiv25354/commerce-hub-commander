
import React, { useState } from 'react';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OrdersWrapperProps {
  className?: string;
}

export const OrdersWrapper: React.FC<OrdersWrapperProps> = ({ className }) => {
  const [orderFilter, setOrderFilter] = useState<string>("all");
  
  return (
    <div className={cn(className)}>
      <div className="flex justify-end mb-2">
        <Select value={orderFilter} onValueChange={setOrderFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter Orders" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <RecentOrders />
    </div>
  );
};
