// components/edit-product-dialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Image as ImageIcon, Save } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

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

type EditProductDialogProps = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedProduct: Product, newImageUrl: string) => void;
};

export default function EditProductDialog({
  product,
  open,
  onOpenChange,
  onSave,
}: EditProductDialogProps) {
  const [editedProduct, setEditedProduct] = useState<Product | null>(product);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");

  // Sync when product changes (on open)
  React.useEffect(() => {
    setEditedProduct(product);
    setImageUrl(product?.imageUrl || "");
  }, [product]);

  if (!editedProduct) return null;

  const handleSave = () => {
    onSave(editedProduct, imageUrl);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to the product details below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input
                value={editedProduct.name}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={editedProduct.category}
                onValueChange={(value) =>
                  setEditedProduct({ ...editedProduct, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Shoes">Shoes</SelectItem>
                  <SelectItem value="Clothes">Clothes</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Regular Price ($)</Label>
              <Input
                type="number"
                step="0.01"
                value={editedProduct.price}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Discount Price ($) (Optional)</Label>
              <Input
                type="number"
                step="0.01"
                value={editedProduct.discountPrice || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    discountPrice: e.target.value
                      ? parseFloat(e.target.value)
                      : null,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Stock Quantity</Label>
              <Input
                type="number"
                value={editedProduct.stock}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    stock: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              rows={4}
              value={editedProduct.description}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-muted-foreground" />
              <Label>Product Image URL</Label>
            </div>
            <Input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            {imageUrl && (
              <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden border">
                <Image
                  src={imageUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                  unoptimized
                  onError={() => setImageUrl(editedProduct.imageUrl)}
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
