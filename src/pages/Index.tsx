
import { useEffect } from "react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { ShoppingCart, Package, DollarSign, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Dashboard | Grocery Commerce Hub";
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}. Here's an overview of your grocery store.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="$12,548"
          description="from last month"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Orders"
          value="354"
          description="this week"
          icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatsCard
          title="Products"
          value="1,253"
          description="in inventory"
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 2.1, isPositive: false }}
        />
        <StatsCard
          title="Customers"
          value="5,732"
          description="registered users"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 5.7, isPositive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RevenueChart className="md:col-span-2 lg:col-span-4" />
        <RecentOrders className="md:col-span-2 lg:col-span-3" />
      </div>
    </div>
  );
};

export default Dashboard;
