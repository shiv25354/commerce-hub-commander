
import { UserRole } from "@/contexts/AuthContext";

export const getRoleBadgeColor = (role: UserRole) => {
  switch (role) {
    case 'admin':
      return 'bg-dashboard-blue text-white hover:bg-dashboard-blue';
    case 'vendor':
      return 'bg-dashboard-green text-white hover:bg-dashboard-green';
    case 'delivery':
      return 'bg-dashboard-yellow text-white hover:bg-dashboard-yellow';
    default:
      return 'bg-gray-500 text-white hover:bg-gray-500';
  }
};

export const getStatusBadgeColor = (status: string) => {
  return status === 'active'
    ? 'bg-green-100 text-green-800 hover:bg-green-100'
    : 'bg-red-100 text-red-800 hover:bg-red-100';
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
