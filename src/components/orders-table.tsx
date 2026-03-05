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
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Package,
  Tag,
} from 'lucide-react';
import Link from 'next/link';

interface OrdersTableProps {
  orders: any[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const toggleOrder = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  if (orders.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[55vh] p-8 text-center'>
        <div className='relative mb-8'>
          <div className='absolute inset-0 bg-accent/10 blur-3xl rounded-full scale-150' />
          <div className='relative bg-sidebar border-2 border-dashed border-accent/20 rounded-3xl p-10 shadow-lg'>
            <Package
              className='size-16 text-accent mx-auto'
              strokeWidth={1.5}
            />
          </div>
        </div>
        <h2 className='text-2xl font-bold tracking-tight mb-2'>
          No orders yet
        </h2>
        <p className='text-muted-foreground mb-8 max-w-xs'>
          You haven&apos;t placed any orders yet. Your next great drone is just
          a click away.
        </p>
        <Button
          asChild
          className='bg-accent hover:bg-accent/90 text-white h-11 px-8 rounded-xl shadow-lg shadow-accent/20'
        >
          <Link href='/dashboard/products'>Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='border rounded-xl bg-sidebar overflow-hidden'>
      <Table>
        <TableHeader className='bg-muted/50'>
          <TableRow>
            <TableHead className='w-[150px]'>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <>
              <TableRow
                key={order.id}
                className='cursor-pointer hover:bg-muted/20'
                onClick={() => toggleOrder(order.id)}
              >
                <TableCell className='font-mono text-xs text-muted-foreground'>
                  {order.id.slice(0, 8)}...
                </TableCell>
                <TableCell className='flex items-center gap-2'>
                  <Calendar className='size-3 text-muted-foreground' />
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className='font-semibold'>
                  ${(order.totalAmount / 100).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant='outline'
                    className='bg-green-500/10 text-green-500 border-green-500/20 uppercase text-[10px]'
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className='text-muted-foreground text-xs'>
                  {order.shippingOption === 'store-pickup'
                    ? 'Store Pickup'
                    : 'Home Delivery'}
                </TableCell>
                <TableCell className='text-right'>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleOrder(order.id);
                    }}
                  >
                    {expandedOrders.has(order.id) ? (
                      <ChevronUp className='size-4' />
                    ) : (
                      <ChevronDown className='size-4' />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
              {expandedOrders.has(order.id) && (
                <TableRow className='bg-muted/5 border-b-0'>
                  <TableCell
                    colSpan={6}
                    className='p-0'
                  >
                    <div className='p-6 animate-in slide-in-from-top-2 duration-200'>
                      <div className='grid gap-4'>
                        {order.items.map((item: any) => (
                          <div
                            key={item.id}
                            className='flex items-center gap-4 bg-sidebar p-3 rounded-lg border shadow-sm'
                          >
                            <div className='size-16 rounded-lg bg-muted shrink-0 overflow-hidden border'>
                              {item.imageUrl && (
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className='size-full object-cover'
                                />
                              )}
                            </div>
                            <div className='flex-1'>
                              <h4 className='font-semibold'>{item.name}</h4>
                              <div className='flex items-center gap-3 mt-1'>
                                <span className='text-sm text-muted-foreground'>
                                  Qty: {item.quantity}
                                </span>
                                <span className='text-sm text-accent'>
                                  ${(item.price / 100).toFixed(2)}
                                </span>
                              </div>
                            </div>
                            <Button
                              variant='ghost'
                              size='icon'
                              asChild
                            >
                              <Link href={`/dashboard/products`}>
                                <ChevronRight className='size-4' />
                              </Link>
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className='mt-6 pt-6 border-t flex items-center justify-between'>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                          <Tag className='size-4' />
                          <span>
                            Full Address:{' '}
                            {order.shippingAddress
                              ? `${order.shippingAddress.name}, ${order.shippingAddress.address?.line1}, ${order.shippingAddress.address?.city}`
                              : 'N/A'}
                          </span>
                        </div>
                        <Button
                          variant='outline'
                          size='sm'
                          className='border-accent text-accent hover:bg-accent hover:text-white'
                        >
                          Reorder All
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
