
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "@/components/products/ProductsTable";
import { ProductSearch } from "@/components/products/ProductSearch";
import { AddProductDialog } from "@/components/products/AddProductDialog";
import { Product } from "@/types/product";
import { MOCK_PRODUCTS } from "@/data/mockProducts";

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
        <p className="text-muted-foreground">
          Add, edit, and manage your grocery products
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ProductSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
        <AddProductDialog onProductAdded={handleAddProduct} />
      </div>

      <ProductsTable products={filteredProducts} />
    </div>
  );
};

export default Products;
