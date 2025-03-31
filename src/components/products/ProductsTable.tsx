
import { 
  Table, 
  TableHeader, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2,
  Eye,
  Tag
} from "lucide-react";
import { Product } from "@/types/product";

interface ProductsTableProps {
  products: Product[];
}

export const ProductsTable = ({ products }: ProductsTableProps) => {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const formatStatus = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="hidden md:table-cell">Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-md border overflow-hidden">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="grid gap-0.5">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-blue-50">
                  <Tag className="mr-1 h-3 w-3" />
                  {product.category}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">
                {formatPrice(product.price)}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {product.stock}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusBadgeColor(product.status)}>
                  {formatStatus(product.status)}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
