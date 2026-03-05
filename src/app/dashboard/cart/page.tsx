// app/dashboard/cart/page.tsx
'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { SearchForm } from '@/components/search-form';
import { Button } from '@/components/ui/button';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Plus, Minus, ShoppingCart, PackageSearch } from 'lucide-react';
import { useSession } from 'next-auth/react';
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
import { DataTable } from '@/components/data-table';

type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemIdToRemove, setItemIdToRemove] = useState<string | null>(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState<
    'store-pickup' | 'home-delivery'
  >('home-delivery');
  const { data: session } = useSession();
  const userId = (session?.user as any)?.id;
  // console.log('Current Session:', session);
  // console.log('Detected userId:', userId);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
    setLoading(false);

    // If user navigates back to cart after success, clear it
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('session_id')) {
      localStorage.removeItem('cart');
    }
  }, []);

  // useEffect(() => {
  // }, []);

  // Save cart whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, loading]);

  // Update quantity
  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // Trigger remove confirmation
  const confirmRemove = (id: string) => {
    setItemIdToRemove(id);
  };

  // Actually remove the item
  const executeRemove = () => {
    if (!itemIdToRemove) return;

    const item = cartItems.find((i) => i.id === itemIdToRemove);
    setCartItems((prev) => prev.filter((i) => i.id !== itemIdToRemove));
    toast.success(`${item?.name || 'Item'} removed from cart`);
    setItemIdToRemove(null);
  };

  // Cancel removal
  const cancelRemove = () => {
    setItemIdToRemove(null);
  };

  // Calculate totals
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  // const taxRate = 0.1;
  // const tax = subtotal * taxRate;
  const grandTotal = subtotal;
  // const grandTotal = subtotal + tax;

  // Find the item being removed for dialog display
  const itemBeingRemoved = cartItems.find((i) => i.id === itemIdToRemove);

  return (
    <SidebarProvider
      style={{ '--sidebar-width': '19rem' } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset>
        <header className='flex border-b h-16 shrink-0 items-center justify-between gap-2 px-4'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger className='-ml-1' />
          </div>
          <SearchForm />
        </header>

        <div className='flex gap-2 items-center justify-between p-6 my-4'>
          <h2 className='text-lg'>My Cart</h2>
          <Button
            asChild
            variant='outline'
            className='border border-accent hover:text-white py-2 px-4'
          >
            <Link href='/dashboard/products'>Continue Shopping</Link>
          </Button>
        </div>

        {loading ? (
          <div className='flex flex-col items-center justify-center min-h-[60vh] gap-3'>
            <PackageSearch className='size-10 text-muted-foreground animate-pulse' />
            <p className='text-muted-foreground text-sm'>
              Loading your cart&hellip;
            </p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className='flex flex-col items-center justify-center min-h-[60vh] p-8 text-center'>
            <div className='relative mb-8'>
              <div className='absolute inset-0 bg-accent/10 blur-3xl rounded-full scale-150' />
              <div className='relative bg-sidebar border-2 border-dashed border-accent/20 rounded-3xl p-10 shadow-lg'>
                <ShoppingCart
                  className='size-16 text-accent mx-auto'
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <h2 className='text-2xl font-bold tracking-tight mb-2'>
              Your cart is empty
            </h2>
            <p className='text-muted-foreground mb-8 max-w-xs'>
              You have no items in your cart yet. Browse our collection and add
              something you love.
            </p>
            <Button
              asChild
              className='bg-accent hover:bg-accent/90 text-white h-11 px-8 rounded-xl shadow-lg shadow-accent/20'
            >
              <Link href='/dashboard/products'>Shop Now</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className='px-6'>
              <DataTable
                data={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={confirmRemove}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 p-6 mt-8'>
              <div className='border rounded-lg p-4 bg-sidebar'>
                <h3 className='border-b p-2'>Choose shipping mode</h3>
                <RadioGroup
                  value={selectedShipping}
                  onValueChange={(value) =>
                    setSelectedShipping(
                      value as 'store-pickup' | 'home-delivery',
                    )
                  }
                  className='mt-4'
                >
                  <div className='flex items-center justify-between gap-2'>
                    <Label
                      htmlFor='store-pickup'
                      className='cursor-pointer text-base flex flex-col space-y-0.5 items-start justify-center'
                    >
                      <span>Store Pickup</span>
                      <span className='text-sm text-muted-foreground'>
                        Pick up your order for free at our store within 1-2
                        hours. Ready when you are!
                      </span>
                    </Label>
                    <RadioGroupItem
                      value='store-pickup'
                      id='store-pickup'
                    />
                  </div>

                  <div className='flex items-center justify-between mt-4 gap-2'>
                    <Label
                      htmlFor='home-delivery'
                      className='cursor-pointer text-base flex flex-col space-y-0.5 items-start justify-center'
                    >
                      <span>Home Delivery</span>
                      <span className='text-sm text-muted-foreground'>
                        Delivered to your doorstep in 2–5 business days.
                        Standard shipping fee applies.
                      </span>
                    </Label>
                    <RadioGroupItem
                      value='home-delivery'
                      id='home-delivery'
                    />
                  </div>
                </RadioGroup>
              </div>

              <div className='border rounded-lg p-4 bg-sidebar'>
                <h3 className='border-b p-2'>Order Summary</h3>
                <div className='flex flex-col gap-2 p-2 border-b'>
                  <div className='flex justify-between'>
                    <span>Total Items:</span>
                    <span className='font-bold'>{totalItems}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Subtotal:</span>
                    <span className='font-bold'>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Tax (0%):</span>
                    <span className='font-bold'>$0.00</span>
                    {/* <span>Tax (10%):</span>
                    <span className='font-bold'>${tax.toFixed(2)}</span> */}
                  </div>
                  <div className='flex justify-between text-lg font-bold pt-2 border-t'>
                    <span>Grand Total:</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  className='w-full mt-4 bg-accent text-white'
                  disabled={cartItems.length === 0 || loadingCheckout}
                  onClick={async () => {
                    setLoadingCheckout(true);
                    const res = await fetch('/api/checkout/session', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        items: cartItems,
                        shippingOption: selectedShipping, // from your RadioGroup value
                        userId,
                      }),
                    });
                    const { url } = await res.json();
                    if (url) {
                      window.location.href = url; // Redirect to Stripe Checkout
                    } else {
                      toast.error('Failed to start checkout');
                    }
                    setLoadingCheckout(false);
                  }}
                >
                  {loadingCheckout ? 'Loading...' : 'Proceed to Checkout'}
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Remove Confirmation Dialog */}
        <AlertDialog
          open={!!itemIdToRemove}
          onOpenChange={() => setItemIdToRemove(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove from cart?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove{' '}
                <strong>{itemBeingRemoved?.name || 'this item'}</strong> from
                your cart?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelRemove}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={executeRemove}
                className='bg-destructive text-white hover:bg-destructive/90'
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarInset>
    </SidebarProvider>
  );
}
