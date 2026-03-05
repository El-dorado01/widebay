// app/checkout/success/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function SuccessPage() {
  useEffect(() => {
    // Clear the cart
    localStorage.removeItem('cart');
    toast.success('Order placed successfully! Your cart has been cleared.');
  }, []);

  return (
    <div className='container mx-auto px-4 py-16 text-center max-w-2xl'>
      <div className='mb-8'>
        <div className='mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6'>
          <svg
            className='w-12 h-12 text-green-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 13l4 4L19 7'
            />
          </svg>
        </div>
        <h1 className='text-4xl font-bold mb-4'>Payment Successful!</h1>
        <p className='text-xl text-muted-foreground mb-8'>
          Thank you for your order. We've received your payment and will send a
          confirmation email shortly.
        </p>
      </div>

      <div className='flex flex-col sm:flex-row gap-4 justify-center'>
        {/* Correct: Single child (Link) inside asChild Button */}
        <Button
          asChild
          size='lg'
        >
          <Link href='/dashboard/products'>Continue Shopping</Link>
        </Button>

        {/* Optional second button */}
        <Button
          asChild
          variant='outline'
          size='lg'
          className='hover:text-white'
        >
          <Link href='/dashboard/orders'>View My Orders</Link>
        </Button>
      </div>
    </div>
  );
}
