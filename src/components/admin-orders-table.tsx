'use client';

import { useState } from 'react';
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
import { Eye, Package } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import Image from 'next/image';

// We inline minimal typing for what Prisma returns
type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
};

type OrderUser = {
  name: string | null;
  email: string | null;
};

type GenericOrder = {
  id: string;
  customerName: string | null;
  customerEmail: string | null;
  createdAt: Date;
  totalAmount: number;
  status: string;
  items: OrderItem[];
  user?: OrderUser | null;
};

export default function AdminOrdersTable({
  orders,
}: {
  orders: GenericOrder[];
}) {
  const [selectedOrder, setSelectedOrder] = useState<GenericOrder | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className='font-mono text-xs'>
                {order.id.slice(0, 8)}...
              </TableCell>
              <TableCell>
                <div className='flex flex-col'>
                  <span className='font-medium'>
                    {order.customerName || order.user?.name || 'Guest'}
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    {order.customerEmail || order.user?.email}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </TableCell>
              <TableCell>${(order.totalAmount / 100).toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={order.status === 'paid' ? 'default' : 'secondary'}
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className='text-right'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setSelectedOrder(order)}
                >
                  <Eye className='mr-2 h-4 w-4' />
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Sheet
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
      >
        <SheetContent className='w-full sm:max-w-md overflow-y-auto p-6 sm:p-8'>
          <SheetHeader className='mb-6'>
            <SheetTitle className='text-xl'>Order Details</SheetTitle>
            <SheetDescription>
              Viewing items for order ID:{' '}
              <span className='font-mono text-foreground'>
                {selectedOrder?.id.slice(0, 8)}
              </span>
            </SheetDescription>
          </SheetHeader>

          {selectedOrder && (
            <div className='space-y-8 pb-6'>
              <div className='flex items-center justify-between p-4 rounded-lg bg-muted/50 border'>
                <div>
                  <p className='text-sm font-medium'>Status</p>
                  <Badge
                    variant={
                      selectedOrder.status === 'paid' ? 'default' : 'secondary'
                    }
                  >
                    {selectedOrder.status}
                  </Badge>
                </div>
                <div className='text-right'>
                  <p className='text-sm font-medium'>Total Paid</p>
                  <p className='font-bold text-lg'>
                    ${(selectedOrder.totalAmount / 100).toFixed(2)}
                  </p>
                </div>
              </div>

              <div>
                <h3 className='font-semibold flex items-center gap-2 mb-4'>
                  <Package className='h-4 w-4' />
                  Purchased Items ({selectedOrder.items.length})
                </h3>
                <div className='space-y-4'>
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className='flex items-center gap-4 p-3 rounded-lg border bg-card'
                    >
                      {item.imageUrl ? (
                        <div className='relative h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0'>
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className='object-cover'
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className='h-16 w-16 rounded-md bg-muted flex items-center justify-center flex-shrink-0'>
                          <Package className='h-6 w-6 text-muted-foreground' />
                        </div>
                      )}

                      <div className='flex-1 min-w-0'>
                        <p className='font-medium text-sm line-clamp-2'>
                          {item.name}
                        </p>
                        <div className='flex items-center justify-between mt-1'>
                          <span className='text-sm text-muted-foreground'>
                            Qty: {item.quantity}
                          </span>
                          <span className='font-medium text-sm'>
                            ${(item.price / 100).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='pt-6 border-t'>
                <h3 className='font-semibold mb-2'>Customer Information</h3>
                <div className='text-sm space-y-1 text-muted-foreground'>
                  <p>
                    <span className='font-medium text-foreground'>Name:</span>{' '}
                    {selectedOrder.customerName ||
                      selectedOrder.user?.name ||
                      'Guest'}
                  </p>
                  <p>
                    <span className='font-medium text-foreground'>Email:</span>{' '}
                    {selectedOrder.customerEmail || selectedOrder.user?.email}
                  </p>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
