
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InventoryAlertsProps {
  className?: string;
}

interface LowStockItem {
  id: string;
  name: string;
  sku: string;
  currentStock: number;
  threshold: number;
  vendor: string;
}

// Mock data for low stock items
const LOW_STOCK_ITEMS: LowStockItem[] = [
  {
    id: '1',
    name: 'Organic Apples',
    sku: 'SKU-001',
    currentStock: 5,
    threshold: 10,
    vendor: 'Fresh Farms'
  },
  {
    id: '2',
    name: 'Whole Wheat Bread',
    sku: 'SKU-034',
    currentStock: 3,
    threshold: 15,
    vendor: 'Healthy Bakery'
  },
  {
    id: '3',
    name: 'Fresh Milk 1L',
    sku: 'SKU-067',
    currentStock: 7,
    threshold: 20,
    vendor: 'Dairy Delights'
  },
  {
    id: '4',
    name: 'Chicken Breast',
    sku: 'SKU-089',
    currentStock: 2,
    threshold: 8,
    vendor: 'Premium Meats'
  }
];

export const InventoryAlerts: React.FC<InventoryAlertsProps> = ({ className }) => {
  return (
    <Card className={cn("col-span-1", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Low Stock Alerts</CardTitle>
          <AlertTriangle className="h-5 w-5 text-amber-500" />
        </div>
        <CardDescription>
          Items below their inventory threshold
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {LOW_STOCK_ITEMS.map((item) => (
            <div 
              key={item.id}
              className="flex items-start justify-between rounded-md border p-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{item.sku}</span>
                  <span>•</span>
                  <span>{item.vendor}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <Badge 
                  variant="outline" 
                  className="bg-red-100 text-red-800 hover:bg-red-100"
                >
                  {item.currentStock}/{item.threshold}
                </Badge>
                <span className="text-xs text-muted-foreground mt-1">Stock Level</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
