// app/admin/featured/page.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Percent, Plus, X } from "lucide-react";

export default function FeaturedPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Manage Featured Items</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trending Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              Trending Products
            </CardTitle>
            <CardDescription>
              Products shown in the &quot;Trending&quot; section on the homepage
              (max 8 recommended)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products to add to trending..."
                  className="pl-10"
                />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-200 border-2 border-dashed rounded-lg w-12 h-12" />
                  <div>
                    <p className="font-medium">Nike Air Max 270</p>
                    <p className="text-sm text-muted-foreground">$129.99</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-destructive">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-200 border-2 border-dashed rounded-lg w-12 h-12" />
                  <div>
                    <p className="font-medium">Wireless Headphones Pro</p>
                    <p className="text-sm text-muted-foreground">$199.99</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-destructive">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center py-4">
              2 products currently trending
            </p>
          </CardContent>
        </Card>

        {/* Discount Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Percent className="h-6 w-6 text-orange-600" />
              Discount Products
            </CardTitle>
            <CardDescription>
              Products featured in the discount carousel on the homepage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products to feature in discount..."
                  className="pl-10"
                />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-200 border-2 border-dashed rounded-lg w-12 h-12" />
                  <div>
                    <p className="font-medium">Premium Leather Jacket</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground line-through">
                        $299.99
                      </span>
                      <Badge variant="destructive">$199.99</Badge>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-destructive">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center py-4">
              1 product currently in discount carousel
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
