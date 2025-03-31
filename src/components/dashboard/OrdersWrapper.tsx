
import React from 'react';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { cn } from '@/lib/utils';

interface OrdersWrapperProps {
  className?: string;
}

export const OrdersWrapper: React.FC<OrdersWrapperProps> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <RecentOrders />
    </div>
  );
};
