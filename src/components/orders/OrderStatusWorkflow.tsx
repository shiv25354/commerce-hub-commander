
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { 
  Package, 
  Truck, 
  Check, 
  Clock, 
  RefreshCw, 
  X, 
  AlertTriangle 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface OrderStatusWorkflowProps {
  currentStatus: string;
  onUpdateStatus: (status: string) => void;
}

type OrderStatusStep = {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  allowedRoles: string[];
  isAvailable: (currentStatus: string) => boolean;
};

export function OrderStatusWorkflow({ currentStatus, onUpdateStatus }: OrderStatusWorkflowProps) {
  const { user } = useAuth();
  const userRole = user?.role || 'admin';
  const [confirmStatus, setConfirmStatus] = useState<string | null>(null);

  const orderStatusSteps: OrderStatusStep[] = [
    {
      value: "processing",
      label: "Process Order",
      description: "Confirm and process the order",
      icon: <RefreshCw className="h-5 w-5" />,
      allowedRoles: ['admin', 'vendor'],
      isAvailable: (status) => status === 'pending'
    },
    {
      value: "ready-to-ship",
      label: "Ready to Ship",
      description: "Mark order as ready for pickup",
      icon: <Package className="h-5 w-5" />,
      allowedRoles: ['admin', 'vendor'],
      isAvailable: (status) => status === 'processing'
    },
    {
      value: "shipped",
      label: "Ship Order",
      description: "Confirm order has been picked up",
      icon: <Truck className="h-5 w-5" />,
      allowedRoles: ['admin', 'delivery'],
      isAvailable: (status) => status === 'ready-to-ship'
    },
    {
      value: "out-for-delivery",
      label: "Out for Delivery",
      description: "Order is on the way to customer",
      icon: <Clock className="h-5 w-5" />,
      allowedRoles: ['admin', 'delivery'],
      isAvailable: (status) => status === 'shipped'
    },
    {
      value: "delivered",
      label: "Mark as Delivered",
      description: "Confirm successful delivery",
      icon: <Check className="h-5 w-5" />,
      allowedRoles: ['admin', 'delivery'],
      isAvailable: (status) => status === 'out-for-delivery'
    },
    {
      value: "cancelled",
      label: "Cancel Order",
      description: "Cancel this order",
      icon: <X className="h-5 w-5" />,
      allowedRoles: ['admin', 'vendor'],
      isAvailable: (status) => ['pending', 'processing', 'ready-to-ship'].includes(status)
    }
  ];

  // Filter steps based on user role and current order status
  const availableSteps = orderStatusSteps.filter(step => 
    step.allowedRoles.includes(userRole) && 
    step.isAvailable(currentStatus)
  );

  const handleStatusUpdate = () => {
    if (confirmStatus) {
      onUpdateStatus(confirmStatus);
      setConfirmStatus(null);
    }
  };

  const getStatusCompletePercentage = () => {
    const statusOrder = ['pending', 'processing', 'ready-to-ship', 'shipped', 'out-for-delivery', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    
    if (currentStatus === 'cancelled') return 0;
    if (currentIndex === -1) return 0;
    
    return Math.round((currentIndex / (statusOrder.length - 1)) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Order Progress</span>
          <span>{getStatusCompletePercentage()}%</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{ width: `${getStatusCompletePercentage()}%` }}
          />
        </div>
      </div>
      
      {currentStatus === 'cancelled' ? (
        <div className="flex items-center p-4 border border-red-200 bg-red-50 rounded-md">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          <div>
            <p className="font-medium text-red-800">Order Cancelled</p>
            <p className="text-sm text-red-600">This order has been cancelled and cannot be processed further.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Available Actions</h3>
          
          {availableSteps.length > 0 ? (
            <div className="grid grid-cols-1 gap-2">
              {availableSteps.map((step) => (
                <AlertDialog key={step.value}>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant={step.value === "cancelled" ? "destructive" : "outline"} 
                      className="justify-start"
                      onClick={() => setConfirmStatus(step.value)}
                    >
                      {step.icon}
                      <span className="ml-2">{step.label}</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {step.value === "cancelled" 
                          ? "Cancel this order?" 
                          : `Update order to "${step.label}"?`}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {step.value === "cancelled"
                          ? "This action cannot be undone. This will permanently cancel the order and cannot be reactivated."
                          : `This will update the order status to "${step.label}". You can change the status again later if needed.`}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setConfirmStatus(null)}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={handleStatusUpdate}>
                        {step.value === "cancelled" ? "Yes, cancel order" : "Yes, update status"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 border border-gray-200 rounded-md">
              <p className="text-sm text-muted-foreground">
                {currentStatus === 'delivered' 
                  ? "This order has been delivered. No further actions are available."
                  : "No actions available for your role at this status."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
