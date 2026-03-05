// components/add-products-form.tsx
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Package, Image as ImageIcon, Loader2, Plus } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { createProduct } from '@/lib/actions';

type AddProductFormProps = {
  onSuccess?: () => Promise<void>;
};

type Category = {
  id: string;
  name: string;
};

// Simple, type-safe schema – uses coerce for numbers
// Empty input → NaN → Zod coerces to undefined for optional fields
const addProductSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }).max(200),
  description: z.string().min(1, { message: 'Description is required' }),
  price: z.coerce
    .number({ message: 'Price must be a number' })
    .positive({ message: 'Price must be greater than 0' }),
  discountPrice: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.coerce
      .number({ message: 'Discount price must be a number' })
      .positive({ message: 'Discount price must be positive' })
      .optional()
  ),
  stock: z.coerce
    .number({ message: 'Stock must be a number' })
    .int()
    .min(0, { message: 'Stock cannot be negative' }),
  imageUrl: z.string().url({ message: 'Must be a valid image URL' }),
  categoryId: z.string().min(1, { message: 'Please select a category' }),
});

type FormData = z.infer<typeof addProductSchema>;

export default function AddProductForm({ onSuccess }: AddProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [imagePreview, setImagePreview] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(addProductSchema) as any,
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      discountPrice: undefined,
      stock: 0,
      imageUrl: '',
      categoryId: '',
    },
  });

  useEffect(() => {
    register('categoryId'); // This tells RHF to track this field
  }, [register]);

  const watchedImageUrl = watch('imageUrl');

  useEffect(() => {
    fetch('/api/admin/categories', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data: Category[]) => setCategories(data))
      .catch(() => toast.error('Failed to load categories'));
  }, []);

  useEffect(() => {
    setImagePreview(watchedImageUrl || '');
  }, [watchedImageUrl]);

  const onSubmit = async (data: FormData) => {
    const promise = createProduct({
      name: data.name,
      description: data.description,
      price: data.price,
      discountPrice: data.discountPrice ?? null,
      stock: data.stock,
      imageUrl: data.imageUrl,
      categoryId: data.categoryId,
    }).then(async () => {
      reset();
      setImagePreview('');
      await onSuccess?.();
    });

    toast.promise(promise, {
      loading: 'Creating product...',
      success: 'Product added successfully!',
      error: (err) => err.message || 'Failed to add product',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Package className='h-6 w-6' />
          Add New Product
        </CardTitle>
        <CardDescription>
          Create a new product and assign it to a category
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Product Name</Label>
              <Input
                id='name'
                placeholder='e.g., Nike Air Max 270'
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
                value={watch('categoryId')}
                onValueChange={(value) =>
                  setValue('categoryId', value, { shouldValidate: true })
                }
                disabled={isSubmitting || categories.length === 0}
              >
                <SelectTrigger id='categoryId' className='w-full'>
                  <SelectValue
                    placeholder={
                      categories.length === 0
                        ? 'Loading...'
                        : 'Select a category'
                    }
                  />
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
                placeholder='129.99'
                {...register('price')}
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
                placeholder='99.99'
                {...register('discountPrice')}
                disabled={isSubmitting}
              />
              <p className='text-xs text-muted-foreground'>
                Leave empty for no discount
              </p>
              {errors.discountPrice && (
                <p className='text-sm text-destructive'>
                  {errors.discountPrice.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='stock'>Stock Quantity</Label>
              <Input
                id='stock'
                type='number'
                placeholder='50'
                {...register('stock')}
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
            <Label htmlFor='description'>Product Description</Label>
            <Textarea
              id='description'
              rows={5}
              placeholder='Describe the product features, materials, sizing info, etc.'
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
              placeholder='https://example.com/image.jpg'
              {...register('imageUrl')}
              onChange={(e) => {
                register('imageUrl').onChange(e);
                setImagePreview(e.target.value);
              }}
              disabled={isSubmitting}
            />
            {errors.imageUrl && (
              <p className='text-sm text-destructive'>
                {errors.imageUrl.message}
              </p>
            )}

            {imagePreview ? (
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
            ) : (
              <div className='w-full max-w-md aspect-square rounded-lg border-2 border-dashed flex items-center justify-center bg-muted'>
                <p className='text-muted-foreground text-center'>
                  Image preview will appear here once you enter a valid URL
                </p>
              </div>
            )}
          </div>

          <div className='flex justify-end'>
            <Button
              type='submit'
              size='lg'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                  Adding Product...
                </>
              ) : (
                <>
                  <Plus className='mr-2 h-5 w-5' />
                  Add Product
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
