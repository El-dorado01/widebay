// app/admin/categories/page.tsx
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
import { Plus, Edit, Trash2 } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Categories</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create New Category</CardTitle>
            <CardDescription>
              Add a new category to organize products
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input id="name" placeholder="e.g., Shoes, Electronics" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Description (Optional)</Label>
              <Textarea id="desc" placeholder="Brief description..." rows={3} />
            </div>
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Create Category
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Shoes", "Clothes", "Accessories", "Electronics"].map((cat) => (
                <div
                  key={cat}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{cat}</p>
                    <p className="text-sm text-muted-foreground">12 products</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
