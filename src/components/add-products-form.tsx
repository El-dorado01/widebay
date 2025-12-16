// components/add-products-form.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Plus, Package, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function AddProductForm() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-6 w-6" />
          Add New Product
        </CardTitle>
        <CardDescription>
          Create a new product and assign it to a category
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="add-name">Product Name</Label>
            <Input id="add-name" placeholder="e.g., Nike Air Max 270" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="add-category">Category</Label>
            <Select>
              <SelectTrigger id="add-category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shoes">Shoes</SelectItem>
                <SelectItem value="clothes">Clothes</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="add-price">Regular Price ($)</Label>
            <Input
              id="add-price"
              type="number"
              step="0.01"
              placeholder="129.99"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="add-discount">Discount Price ($) (Optional)</Label>
            <Input
              id="add-discount"
              type="number"
              step="0.01"
              placeholder="99.99"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="add-stock">Stock Quantity</Label>
            <Input id="add-stock" type="number" placeholder="50" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="add-description">Product Description</Label>
          <Textarea
            id="add-description"
            rows={5}
            placeholder="Describe the product features, materials, sizing info, etc."
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
            <Label htmlFor="add-image-url">Product Image URL</Label>
          </div>
          <Input
            id="add-image-url"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          {imageUrl ? (
            <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden border">
              <Image
                src={imageUrl}
                alt="Product preview"
                fill
                className="object-cover"
                unoptimized
                onError={() => setImageUrl("")}
              />
            </div>
          ) : (
            <div className="w-full max-w-md aspect-square rounded-lg border-2 border-dashed flex items-center justify-center bg-muted">
              <p className="text-muted-foreground text-center">
                Image preview will appear here
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Add Product
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
