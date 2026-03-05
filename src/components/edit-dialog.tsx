import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, Edit } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Category = {
  id: string;
  name: string;
  description: string | null;
  _count: { products: number };
};

type EditDialogProps = {
  category: Category;
  onSuccess?: () => void; // optional callback to refresh list
};

const editSchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100),
  description: z.string().optional(), // empty string allowed
});

type EditFormData = z.infer<typeof editSchema>;

export const EditDialog = ({ category, onSuccess }: EditDialogProps) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditFormData>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      name: category.name,
      description: category.description ?? '', // convert null → empty string
    },
  });

  const onEdit = async (data: EditFormData) => {
    const toastId = toast.loading('Updating category...');

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: category.id,
          name: data.name.trim(),
          description:
            data.description?.trim() === '' ? null : data.description?.trim(),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.[0]?.message || 'Failed to update category');
      }

      toast.success('Category updated successfully!', { id: toastId });
      setOpen(false);
      reset();
      onSuccess?.(); // refresh the list
    } catch (error: any) {
      toast.error(error.message || 'Failed to update category', {
        id: toastId,
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          size='sm'
          variant='outline'
        >
          <Edit className='h-4 w-4' />
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Make changes to the category name or description.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onEdit)}
          className='space-y-4'
        >
          <div className='space-y-2'>
            <Label htmlFor='edit-name'>Category Name</Label>
            <Input
              id='edit-name'
              {...register('name')}
              placeholder='e.g., Electronics'
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className='text-sm text-destructive'>{errors.name.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='edit-desc'>Description (optional)</Label>
            <Textarea
              id='edit-desc'
              {...register('description')}
              placeholder='Brief description...'
              rows={3}
              disabled={isSubmitting}
            />
          </div>

          <DialogFooter>
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
};
