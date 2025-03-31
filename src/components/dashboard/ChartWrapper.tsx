
import React from 'react';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { cn } from '@/lib/utils';

interface ChartWrapperProps {
  className?: string;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <RevenueChart />
    </div>
  );
};
