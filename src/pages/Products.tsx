import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { 
  MoreHorizontal, 
  Search, 
  Edit, 
  Trash2,
  Eye,
  Tag
} from "lucide-react";
import { AddProductDialog } from "@/components/products/AddProductDialog";
import { Product } from "@/types/product";

// Mock data for products
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    sku: 'FRUIT-001',
    category: 'Fruits',
    price: 1.99,
    stock: 150,
    status: 'in-stock',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=100&auto=format'
  },
  {
    id: '2',
    name: 'Fresh Milk (1 gallon)',
    sku: 'DAIRY-002',
    category: 'Dairy',
    price: 3.49,
    stock: 75,
    status: 'in-stock',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=100&auto=format'
  },
  {
    id: '3',
    name: 'Whole Grain Bread',
    sku: 'BAKE-003',
    category: 'Bakery',
    price: 2.99,
    stock: 45,
    status: 'in-stock',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?q=80&w=100&auto=format'
  },
  {
    id: '4',
    name: 'Chicken Breast (1 lb)',
    sku: 'MEAT-004',
    category: 'Meat',
    price: 5.99,
    stock: 62,
    status: 'in-stock',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=100&auto=format'
  },
  {
    id: '5',
    name: 'Avocados (bag of 4)',
    sku: 'FRUIT-005',
    category: 'Fruits',
    price: 4.99,
    stock: 0,
    status: 'out-of-stock',
    image: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=100&auto=format'
  },
  {
    id: '6',
    name: 'Organic Eggs (dozen)',
    sku: 'DAIRY-006',
    category: 'Dairy',
    price: 4.49,
    stock: 8,
    status: 'low-stock',
    image: 'https://images.unsplash.com/photo-1598965402089-897c5de12559?q=80&w=100&auto=format'
  },
  {
    id: '7',
    name: 'Fresh Spinach (1 lb)',
    sku: 'VEG-007',
    category: 'Vegetables',
    price: 2.99,
    stock: 35,
    status: 'in-stock',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=100&auto=format'
  },
  {
    id: '8',
    name: 'Bottled Water (24-pack)',
    sku: 'BEV-008',
    category: 'Beverages',
    price: 6.99,
    stock: 85,
    status: 'in-stock',
    image: 'https://images.unsplash.com/photo-1616118132534-381148898bb4?q=80&w=100&auto=format'
  },
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  useEffect(() => {
    document.title = "Product Management | Grocery Commerce Hub";
    
    // Filter products based on search query
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      setFilteredProducts(
        products.filter(
          (product) =>
            product.name.toLowerCase().includes(lowercaseQuery) ||
            product.category.toLowerCase().includes(lowercaseQuery) ||
            product.sku.toLowerCase().includes(lowercaseQuery)
        )
      );
    }
  }, [searchQuery, products]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Already handled in useEffect
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts([newProduct, ...products]);
  };

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
        <p className="text-muted-foreground">
          Add, edit, and manage your grocery products
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearch} className="relative w-full sm:w-auto sm:min-w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <AddProductDialog onProductAdded={handleAddProduct} />
      </div>

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
            {filteredProducts.map((product) => (
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
    </div>
  );
};

export default Products;
