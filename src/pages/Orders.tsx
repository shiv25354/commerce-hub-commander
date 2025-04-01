
import { useState, useEffect } from "react";
import OrderSearch from "@/components/orders/OrderSearch";
import OrderTable from "@/components/orders/OrderTable";
import { MOCK_ORDERS } from "@/components/orders/mockOrders";

const Orders = () => {
  const [filteredOrders, setFilteredOrders] = useState(MOCK_ORDERS);

  useEffect(() => {
    document.title = "Order Management | Grocery Commerce Hub";
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
        <p className="text-muted-foreground">
          Process, track, and manage customer orders
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <OrderSearch onSearchResults={setFilteredOrders} />
      </div>

      <OrderTable orders={filteredOrders} />
    </div>
  );
};

export default Orders;
