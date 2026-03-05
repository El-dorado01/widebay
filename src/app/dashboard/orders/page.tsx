import { getUserOrders } from '@/lib/actions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { redirect } from 'next/navigation';
import { OrdersTable } from '@/components/orders-table';

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const userId = (session.user as any).id;
  const orders = await getUserOrders(userId);

  return (
    <div className='flex flex-col p-6'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-bold'>My Orders</h1>
          <p className='text-muted-foreground'>
            Track and manage your drone purchases in a simple list view.
          </p>
        </div>
      </div>

      <OrdersTable orders={orders as any[]} />
    </div>
  );
}
