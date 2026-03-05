// app/api/webhook/stripe/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';
// import { Prisma } from '@/generated/prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  // Read raw body as text (required for Stripe signature verification)
  const body = await req.text();

  const sig = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 },
    );
  }

  // Handle successful checkout
  if (event.type === 'checkout.session.completed') {
    // const session = event.data.object as Stripe.Checkout.Session;
    const session = event.data.object as Stripe.Checkout.Session;
    // console.log(
    //   'Available Prisma models:',
    //   Object.keys(prisma).filter((k) => !k.startsWith('_')),
    // );

    // Retrieve session with line items
    const fullSession = (await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items.data.price.product'],
    })) as Stripe.Checkout.Session & {
      line_items?: Stripe.ApiList<Stripe.LineItem>;
    };

    const lineItems = fullSession.line_items?.data || [];

    const customerEmail = session.customer_details?.email ?? null;
    const customerName = session.customer_details?.name ?? null;

    // Use the official location for shipping details
    const shippingDetails = (fullSession as any).shipping_details ?? null;

    const shippingOption = session.shipping_cost?.shipping_rate
      ? (session.shipping_cost.shipping_rate as any)?.display_name?.includes(
          'Store',
        )
        ? 'store-pickup'
        : 'home-delivery'
      : 'home-delivery';

    const shippingAddressJson = shippingDetails
      ? {
          name: shippingDetails.name ?? null,
          address: shippingDetails.address ?? null,
        }
      : undefined;

    try {
      await (prisma.order as any).create({
        data: {
          stripeSessionId: session.id,
          userId: session.metadata?.userId || null,
          customerEmail,
          customerName,
          totalAmount: session.amount_total || 0,
          currency: session.currency?.toUpperCase() || 'USD',
          shippingOption,
          shippingAddress: shippingAddressJson,
          items: {
            create: lineItems.map((item) => ({
              productId:
                (item.price?.product as any)?.metadata?.productId || 'unknown',
              name: item.description || 'Unknown Product',
              price: Math.round(item.amount_total / (item.quantity ?? 1)),
              quantity: item.quantity ?? 1,
              imageUrl: (item.price?.product as any)?.images?.[0] || null,
            })),
          },
        },
      });
      console.log('Order saved to database for session:', session.id);
    } catch (dbError) {
      console.error('Error saving order to database:', dbError);
      // We still return 200 to Stripe to avoid retries if the error is permanent,
      // but you might want to handle this differently depending on your requirements.
    }
  }

  return NextResponse.json({ received: true });
}
