// app/api/checkout/session/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { items, shippingOption, userId } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    const line_items = items.map((item: any) => {
      // Only include image if it's a valid, short external URL
      const imageUrl =
        item.imageUrl &&
        typeof item.imageUrl === 'string' &&
        item.imageUrl.startsWith('http') &&
        item.imageUrl.length < 2048
          ? [item.imageUrl]
          : [];

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: imageUrl,
            metadata: {
              productId: item.id,
            },
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/cart`,
      shipping_address_collection: {
        allowed_countries: ['US'], // Adjust as needed
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: shippingOption === 'store-pickup' ? 0 : 999,
              currency: 'usd',
            },
            display_name:
              shippingOption === 'store-pickup'
                ? 'Store Pickup (Free)'
                : 'Home Delivery ($9.99)',
          },
        },
      ],
      allow_promotion_codes: true,
      metadata: {
        userId: userId || '',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to create checkout session' },
      { status: 500 },
    );
  }
}
