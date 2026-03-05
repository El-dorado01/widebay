// app/admin/categories/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { EditDialog } from '@/components/edit-dialog';
import { createCategory, deleteCategory } from '@/lib/actions';

const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100),
  description: z.string().optional(),
});

type CreateFormData = z.infer<typeof createCategorySchema>;

type Category = {
  id: string;
  name: string;
  description: string | null;
  _count: { products: number };
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null); // for dialog

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      } else {
        toast.error('Failed to load categories');
      }
    } catch {
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: isCreating },
  } = useForm<CreateFormData>({
    resolver: zodResolver(createCategorySchema),
  });

  const onCreate = async (data: CreateFormData) => {
    const promise = createCategory(data)
      .then(async () => {
        reset();
        await fetchCategories();
      })
      .catch(() => {
        // error handled by toast.promise
      });

    toast.promise(promise, {
      loading: 'Creating category...',
      success: 'Category created successfully!',
      error: (err) => err.message || 'Failed to create category',
    });
  };

  const confirmAndDelete = async (id: string) => {
    setDeletingId(id);
    setConfirmDeleteId(null); // close dialog

    const promise = deleteCategory(id).then(async () => {
      await fetchCategories();
    });

    const toastId = toast.loading('Deleting category...');

    promise
      .then(() => {
        toast.success('Category deleted successfully!', { id: toastId });
      })
      .catch((err) => {
        toast.error(err.message || 'Failed to delete category', {
          id: toastId,
        });
      })
      .finally(() => {
        setDeletingId(null);
      });
  };

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold'>Manage Categories</h2>

      <div className='grid gap-6 lg:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Create New Category</CardTitle>
            <CardDescription>
              Add a new category to organize products
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <form
              onSubmit={handleSubmit(onCreate)}
              className='space-y-4'
            >
              <div className='space-y-2'>
                <Label htmlFor='name'>Category Name</Label>
                <Input
                  {...register('name')}
                  id='name'
                  placeholder='e.g., Shoes, Electronics'
                  disabled={isCreating}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='desc'>Description (Optional)</Label>
                <Textarea
                  {...register('description')}
                  id='desc'
                  placeholder='Brief description...'
                  rows={3}
                  disabled={isCreating}
                />
              </div>
              <Button
                type='submit'
                className='w-full'
                disabled={isCreating}
              >
                {isCreating ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className='mr-2 h-4 w-4' />
                    Create Category
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing Categories</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className='text-center text-muted-foreground'>Loading...</p>
            ) : categories.length === 0 ? (
              <p className='text-center text-muted-foreground'>
                No categories yet.
              </p>
            ) : (
              <div className='space-y-4'>
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className='flex items-center justify-between rounded-lg border p-4'
                  >
                    <div>
                      <p className='font-medium'>{cat.name}</p>
                      <p className='text-sm text-muted-foreground'>
                        {cat._count.products} product
                        {cat._count.products !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className='flex gap-2'>
                      <EditDialog
                        category={cat}
                        onSuccess={fetchCategories}
                      />

                      <AlertDialog
                        open={confirmDeleteId === cat.id}
                        onOpenChange={(open) =>
                          !open && setConfirmDeleteId(null)
                        }
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            size='sm'
                            variant='destructive'
                            disabled={deletingId === cat.id}
                            onClick={() => setConfirmDeleteId(cat.id)}
                          >
                            {deletingId === cat.id ? (
                              <Loader2 className='h-4 w-4 animate-spin' />
                            ) : (
                              <Trash2 className='h-4 w-4' />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the category "
                              <strong>{cat.name}</strong>" and all its{' '}
                              {cat._count.products} product
                              {cat._count.products !== 1 ? 's' : ''}. This
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => confirmAndDelete(cat.id)}
                              className='bg-destructive text-white hover:bg-destructive/90'
                            >
                              {deletingId === cat.id ? (
                                <>
                                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                  Deleting...
                                </>
                              ) : (
                                'Delete Category'
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
