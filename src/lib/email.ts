// // lib/email.ts
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function sendOrderConfirmationEmail(
//   to: string | null,
//   order: any
// ) {
//   if (!to) return;

//   await resend.emails.send({
//     from: 'Your Store <orders@yourdomain.com>',
//     to,
//     subject: `Order Confirmation #${order.id.slice(0, 8)}`,
//     html: `
//       <h1>Thank you for your order!</h1>
//       <p>Your order has been confirmed.</p>
//       <p><strong>Total:</strong> $${(order.totalAmount / 100).toFixed(2)}</p>
//       <p>We'll send a shipping update soon.</p>
//     `,
//   });
// }
