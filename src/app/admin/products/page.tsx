// app/admin/products/page.tsx
"use client";

import AddProductForm from "@/components/add-products-form";
import EditProductDialog from "@/components/edit-product-dialog";
import ProductsTable from "@/components/products-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  discountPrice: number | null;
  stock: number;
  description: string;
  imageUrl: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Nike Air Max 270",
      category: "Shoes",
      price: 129.99,
      discountPrice: 99.99,
      stock: 45,
      description: "Comfortable running shoes with Max Air unit.",
      imageUrl:
        "https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/air-max-270-shoes-2r6r7k.jpg",
    },
    {
      id: 2,
      name: "Wireless Headphones Pro",
      category: "Electronics",
      price: 199.99,
      discountPrice: null,
      stock: 12,
      description: "Premium noise-cancelling wireless headphones.",
      imageUrl:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTW3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1682362771505",
    },
    {
      id: 3,
      name: "Premium Leather Jacket",
      category: "Clothes",
      price: 299.99,
      discountPrice: 199.99,
      stock: 8,
      description: "Genuine leather jacket with modern fit.",
      imageUrl:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    },
    {
      id: 4,
      name: "Smart Watch Series X",
      category: "Electronics",
      price: 399.99,
      discountPrice: null,
      stock: 23,
      description: "Advanced health tracking and notifications.",
      imageUrl:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX3A3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1687667484143",
    },
  ]);

  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setIsEditOpen(true);
  };

  const handleSave = (updatedProduct: Product, newImageUrl: string) => {
    setProducts(
      products.map((p) =>
        p.id === updatedProduct.id
          ? { ...updatedProduct, imageUrl: newImageUrl }
          : p
      )
    );
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Manage Products</h2>

      <AddProductForm />

      <Card>
        <CardHeader>
          <CardTitle>Existing Products</CardTitle>
          <CardDescription>
            View and manage all products in your store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductsTable products={products} onEdit={handleEdit} />
        </CardContent>
      </Card>

      <EditProductDialog
        product={editProduct}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSave={handleSave}
      />
    </div>
  );
}
