
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '@/lib/utils';

interface DataPoint {
  name: string;
  revenue: number;
  orders: number;
}

// Mock data for the revenue chart
const data: DataPoint[] = [
  { name: 'Jan', revenue: 4000, orders: 240 },
  { name: 'Feb', revenue: 3000, orders: 198 },
  { name: 'Mar', revenue: 2000, orders: 180 },
  { name: 'Apr', revenue: 2780, orders: 208 },
  { name: 'May', revenue: 1890, orders: 170 },
  { name: 'Jun', revenue: 2390, orders: 160 },
  { name: 'Jul', revenue: 3490, orders: 274 },
  { name: 'Aug', revenue: 4000, orders: 280 },
  { name: 'Sep', revenue: 5000, orders: 320 },
  { name: 'Oct', revenue: 4500, orders: 294 },
  { name: 'Nov', revenue: 5500, orders: 350 },
  { name: 'Dec', revenue: 7000, orders: 450 },
];

const formatCurrency = (value: number) => {
  return `$${value.toLocaleString()}`;
};

interface RevenueChartProps {
  className?: string;
}

export function RevenueChart({ className }: RevenueChartProps) {
  return (
    <Card className={cn("col-span-4", className)}>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>
          Monthly revenue and orders for this year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" tickFormatter={formatCurrency} />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'revenue') {
                    return [`${formatCurrency(value as number)}`, 'Revenue'];
                  }
                  return [`${value} orders`, 'Orders'];
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.2}
                yAxisId="left"
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.2}
                yAxisId="right"
                name="Orders"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
