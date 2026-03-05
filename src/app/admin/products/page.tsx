// app/admin/products/page.tsx
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import AddProductForm from '@/components/add-products-form';
import EditProductDialog from '@/components/edit-product-dialog';
import ProductsTable from '@/components/products-table';
import { Product } from '@/types';
import { deleteProduct } from '@/lib/actions';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const limit = 10;

  // Search state
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async (
    currentPage: number = page,
    search: string = searchQuery,
  ) => {
    setLoading(true);
    try {
      const url = new URL(`/api/admin/products`, window.location.origin);
      url.searchParams.set('page', currentPage.toString());
      url.searchParams.set('limit', limit.toString());
      if (search) {
        url.searchParams.set('search', search);
      }

      const res = await fetch(url.toString(), { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
          setTotalPages(1);
          setTotalCount(data.length);
        } else {
          setProducts(data.products || []);
          const total = data.total || 0;
          setTotalCount(total);
          setTotalPages(Math.ceil(total / limit) || 1);
        }
      } else {
        toast.error('Failed to load products');
      }
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page, searchQuery);
  }, [page, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to page 1 on new search
    setSearchQuery(searchInput);
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setIsEditOpen(true);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setConfirmDeleteId(null);

    const promise = deleteProduct(id).then(() =>
      fetchProducts(page, searchQuery),
    );

    const toastId = toast.loading('Deleting product...');

    promise
      .then(() =>
        toast.success('Product deleted successfully!', { id: toastId }),
      )
      .catch((err) =>
        toast.error(err.message || 'Failed to delete product', { id: toastId }),
      )
      .finally(() => setDeletingId(null));
  };

  const handleSave = async () => {
    setIsEditOpen(false);
    await fetchProducts(page, searchQuery);
  };

  return (
    <div className='space-y-8'>
      <h2 className='text-2xl font-bold'>Manage Products</h2>

      <AddProductForm onSuccess={() => fetchProducts(page, searchQuery)} />

      <Card>
        <CardHeader className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
          <div>
            <CardTitle>Existing Products</CardTitle>
            <CardDescription>
              View and manage all products in your store
            </CardDescription>
          </div>
          <form
            onSubmit={handleSearchSubmit}
            className='relative w-full sm:w-64'
          >
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search inventory...'
              className='pl-9 w-full bg-background'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className='text-center py-8 text-muted-foreground'>
              Loading products...
            </p>
          ) : products.length === 0 ? (
            <p className='text-center py-8 text-muted-foreground'>
              No products yet. Add your first one above!
            </p>
          ) : (
            <>
              <ProductsTable
                products={products}
                onEdit={handleEdit}
                onDelete={setConfirmDeleteId}
                deletingId={deletingId}
                currentPage={page}
                totalPages={totalPages}
                totalCount={totalCount}
                onPageChange={setPage}
              />

              {/* Delete Confirmation Dialog */}
              <AlertDialog
                open={!!confirmDeleteId}
                onOpenChange={(open) => !open && setConfirmDeleteId(null)}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete &quot;
                      <strong>
                        {products.find((p) => p.id === confirmDeleteId)?.name}
                      </strong>
                      &quot;. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        confirmDeleteId && handleDelete(confirmDeleteId)
                      }
                      className='bg-destructive text-white hover:bg-destructive/90'
                    >
                      {deletingId ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                          Deleting...
                        </>
                      ) : (
                        'Delete Product'
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </CardContent>
      </Card>

      <EditProductDialog
        product={editProduct}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSuccess={() => fetchProducts(page, searchQuery)}
      />
    </div>
  );
}
