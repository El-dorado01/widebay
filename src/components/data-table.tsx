// components/data-table.tsx
'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';

type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

// Custom meta type
type CartColumnMeta = {
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
};

type DataTableProps = {
  data: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
};

// Define columns with proper meta typing
const columns: ColumnDef<CartItem, any>[] = [
  {
    accessorKey: 'imageUrl',
    header: 'Product',
    cell: ({ row }) => (
      <div className='flex items-center gap-4'>
        <div className='relative w-16 h-16 rounded-md overflow-hidden shrink-0 border'>
          <Image
            src={row.original.imageUrl}
            alt={row.original.name}
            fill
            className='object-cover'
            unoptimized
          />
        </div>
        <div className='flex flex-col'>
          <p className='font-medium line-clamp-2'>{row.original.name}</p>
          <p className='text-sm text-muted-foreground'>
            ${row.original.price.toFixed(2)} each
          </p>
        </div>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row, table }) => {
      const meta = table.options.meta as CartColumnMeta;
      const item = row.original;
      return (
        <div className='flex items-center gap-2'>
          <Button
            size='sm'
            variant='outline'
            onClick={() => meta.onUpdateQuantity(item.id, -1)}
          >
            <Minus className='h-4 w-4' />
          </Button>
          <span className='w-10 text-center font-semibold'>
            {item.quantity}
          </span>
          <Button
            size='sm'
            variant='outline'
            onClick={() => meta.onUpdateQuantity(item.id, 1)}
          >
            <Plus className='h-4 w-4' />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => {
      const item = row.original;
      return (
        <span className='font-semibold'>
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const meta = table.options.meta as CartColumnMeta;
      return (
        <Button
          size='sm'
          variant='ghost'
          className='text-destructive hover:bg-destructive/10'
          onClick={() => meta.onRemoveItem(row.original.id)}
        >
          <Trash2 className='h-4 w-4' />
          <span className='sr-only'>Remove item</span>
        </Button>
      );
    },
  },
];

export function DataTable({
  data,
  onUpdateQuantity,
  onRemoveItem,
}: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    // Pass handlers via meta
    meta: {
      onUpdateQuantity,
      onRemoveItem,
    },
  });

  return (
    <div className='w-full'>
      <div className='rounded-lg border bg-card'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No items in cart.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
