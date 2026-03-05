// components/edit-product-dialog.tsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { updateProduct } from '@/lib/actions';
import { Product } from '@/types';

// Fetch categories for dropdown (you can cache this or fetch once)
const fetchCategories = async () => {
  const res = await fetch('/api/admin/categories');
  if (!res.ok) throw new Error('Failed to load categories');
  return await res.json();
};

type Category = {
  id: string;
  name: string;
};

const editProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(200),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  discountPrice: z.number().positive().nullable().optional(),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  imageUrl: z.string().url('Invalid image URL'),
  categoryId: z.string().uuid('Invalid category'),
});

type EditFormData = z.infer<typeof editProductSchema>;

type EditProductDialogProps = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => Promise<void>;
};

export default function EditProductDialog({
  product,
  open,
  onOpenChange,
  onSuccess,
}: EditProductDialogProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [imagePreview, setImagePreview] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditFormData>({
    resolver: zodResolver(editProductSchema),
  });

  const watchedImageUrl = watch('imageUrl');

  // Load categories once
  useEffect(() => {
    if (open && categories.length === 0) {
      fetchCategories()
        .then(setCategories)
        .catch(() => toast.error('Failed to load categories'));
    }
  }, [open, categories.length]);

  // Reset form when product changes
  useEffect(() => {
    if (product && open) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        discountPrice: product.discountPrice ?? undefined,
        stock: product.stock,
        imageUrl: product.imageUrl,
        categoryId: '', // we'll set this after categories load
      });
      setImagePreview(product.imageUrl);
    }
  }, [product, open, reset]);

  // Set categoryId once categories are loaded
  useEffect(() => {
    if (categories.length > 0 && product) {
      const cat = categories.find((c) => c.name === product.category);
      if (cat) {
        setValue('categoryId', cat.id);
      }
    }
  }, [categories, product, setValue]);

  // Update preview when image URL changes
  useEffect(() => {
    if (watchedImageUrl) {
      setImagePreview(watchedImageUrl);
    }
  }, [watchedImageUrl]);

  const onSubmit = async (data: EditFormData) => {
    if (!product) return;

    const promise = updateProduct({
      id: product.id,
      ...data,
      discountPrice: data.discountPrice ?? null,
    }).then(async () => {
      await onSuccess?.();
      onOpenChange(false);
    });

    toast.promise(promise, {
      loading: 'Updating product...',
      success: 'Product updated successfully!',
      error: (err) => err.message || 'Failed to update product',
    });
  };

  if (!product) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update product details. Changes will be saved immediately.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6 py-4'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Product Name</Label>
              <Input
                id='name'
                {...register('name')}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className='text-sm text-destructive'>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='categoryId'>Category</Label>
              <Select
                onValueChange={(value) => setValue('categoryId', value)}
                defaultValue={
                  categories.find((c) => c.name === product.category)?.id
                }
                disabled={isSubmitting}
              >
                <SelectTrigger id='categoryId' className='w-full'>
                  <SelectValue placeholder='Select category' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat.id}
                      value={cat.id}
                    >
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoryId && (
                <p className='text-sm text-destructive'>
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='price'>Regular Price ($)</Label>
              <Input
                id='price'
                type='number'
                step='0.01'
                {...register('price', { valueAsNumber: true })}
                disabled={isSubmitting}
              />
              {errors.price && (
                <p className='text-sm text-destructive'>
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='discountPrice'>
                Discount Price ($) (Optional)
              </Label>
              <Input
                id='discountPrice'
                type='number'
                step='0.01'
                {...register('discountPrice', { valueAsNumber: true })}
                placeholder='Leave empty for no discount'
                disabled={isSubmitting}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='stock'>Stock Quantity</Label>
              <Input
                id='stock'
                type='number'
                {...register('stock', { valueAsNumber: true })}
                disabled={isSubmitting}
              />
              {errors.stock && (
                <p className='text-sm text-destructive'>
                  {errors.stock.message}
                </p>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              rows={4}
              {...register('description')}
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className='text-sm text-destructive'>
                {errors.description.message}
              </p>
            )}
          </div>

          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <ImageIcon className='h-5 w-5 text-muted-foreground' />
              <Label htmlFor='imageUrl'>Product Image URL</Label>
            </div>
            <Input
              id='imageUrl'
              type='url'
              {...register('imageUrl')}
              placeholder='https://example.com/image.jpg'
              disabled={isSubmitting}
            />
            {errors.imageUrl && (
              <p className='text-sm text-destructive'>
                {errors.imageUrl.message}
              </p>
            )}

            {imagePreview && (
              <div className='relative w-full max-w-md aspect-square rounded-lg overflow-hidden border'>
                <Image
                  src={imagePreview}
                  alt='Product preview'
                  fill
                  className='object-cover'
                  unoptimized
                  onError={() => setImagePreview('')}
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
