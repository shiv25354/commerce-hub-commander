
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductForm, ProductFormValues } from "./ProductForm";
import { useToast } from "@/hooks/use-toast";

interface AddProductDialogProps {
  onProductAdded: (product: any) => void;
}

export const AddProductDialog = ({ onProductAdded }: AddProductDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call
      // For now, we'll create a mock product with a generated ID
      const newProduct = {
        id: Date.now().toString(),
        ...data,
        status: data.stock > 0 ? 'in-stock' : 'out-of-stock'
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onProductAdded(newProduct);
      setOpen(false);
      
      toast({
        title: "Success",
        description: `${data.name} has been added to the product catalog.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add the product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-dashboard-blue hover:bg-dashboard-blue/90">
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new product to your inventory.
          </DialogDescription>
        </DialogHeader>
        <ProductForm 
          onSubmit={handleSubmit} 
          onCancel={() => setOpen(false)} 
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};
