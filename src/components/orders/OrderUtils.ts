
import { MOCK_ORDERS } from "./mockOrders";

export const getOrderStatusBadgeColor = (status: string) => {
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

export const getPaymentStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800 hover:bg-green-100';
    case 'unpaid':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
    case 'refunded':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
  }
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatCurrency = (amount: number) => {
  return `$${amount.toFixed(2)}`;
};

export const filterOrders = (searchQuery: string) => {
  if (searchQuery.trim() === "") {
    return MOCK_ORDERS;
  }
  
  const lowercaseQuery = searchQuery.toLowerCase();
  return MOCK_ORDERS.filter(
    (order) =>
      order.id.toLowerCase().includes(lowercaseQuery) ||
      order.customer.toLowerCase().includes(lowercaseQuery) ||
      order.email.toLowerCase().includes(lowercaseQuery) ||
      order.status.toLowerCase().includes(lowercaseQuery)
  );
};
