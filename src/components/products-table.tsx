// components/products-table.tsx
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/types';

type ProductsTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  deletingId: string | null;
  currentPage?: number;
  totalPages?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;
};

export default function ProductsTable({
  products,
  onEdit,
  onDelete,
  deletingId,
  currentPage = 1,
  totalPages = 1,
  totalCount,
  onPageChange,
}: ProductsTableProps) {
  return (
    <div className='space-y-4'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-20'>Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className='relative w-12 h-12 rounded-lg overflow-hidden border'>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className='object-cover'
                      unoptimized
                    />
                  </div>
                </TableCell>
                <TableCell className='font-medium'>{product.name}</TableCell>
                <TableCell>
                  <Badge variant='outline'>{product.category}</Badge>
                </TableCell>
                <TableCell>
                  {product.discountPrice ? (
                    <div className='flex items-center gap-2'>
                      <span className='text-lg font-semibold text-primary'>
                        ${product.discountPrice.toFixed(2)}
                      </span>
                      <span className='text-sm line-through text-muted-foreground'>
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className='font-semibold'>
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <span
                    className={`font-medium ${
                      product.stock < 10 ? 'text-destructive' : ''
                    }`}
                  >
                    {product.stock} in stock
                  </span>
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex justify-end gap-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => onEdit(product)}
                    >
                      <Edit className='h-4 w-4' />
                    </Button>
                    <Button
                      size='sm'
                      variant='destructive'
                      onClick={() => onDelete(product.id)}
                      disabled={deletingId === product.id}
                    >
                      {deletingId === product.id ? (
                        <Loader2 className='h-4 w-4 animate-spin' />
                      ) : (
                        <Trash2 className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalCount !== undefined && onPageChange && (
        <div className='flex items-center justify-between'>
          <p className='text-sm text-muted-foreground'>
            Showing page {currentPage} of {totalPages} &middot; Total:{' '}
            {totalCount} product{totalCount === 1 ? '' : 's'}
          </p>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant='outline'
              size='sm'
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
