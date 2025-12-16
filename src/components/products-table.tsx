// components/products-table.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";

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

type ProductsTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
};

export default function ProductsTable({
  products,
  onEdit,
}: ProductsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="relative w-12 h-12 rounded-lg overflow-hidden border">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{product.category}</Badge>
              </TableCell>
              <TableCell>
                {product.discountPrice ? (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-primary">
                      ${product.discountPrice.toFixed(2)}
                    </span>
                    <span className="text-sm line-through text-muted-foreground">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <span
                  className={`font-medium ${
                    product.stock < 10 ? "text-destructive" : ""
                  }`}
                >
                  {product.stock} in stock
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:text-white"
                    onClick={() => onEdit(product)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
