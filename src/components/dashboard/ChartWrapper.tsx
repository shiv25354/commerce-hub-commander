
import React from 'react';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChartWrapperProps {
  className?: string;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <Tabs defaultValue="revenue">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue">
          <RevenueChart />
        </TabsContent>
        <TabsContent value="orders">
          <RevenueChart />
        </TabsContent>
        <TabsContent value="products">
          <RevenueChart />
        </TabsContent>
      </Tabs>
    </div>
  );
};
