import prisma from '@/lib/prisma';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import AdminOrdersTable from '@/components/admin-orders-table';

export default async function AdminUsersPage() {
  const [users, orders] = await Promise.all([
    prisma.user.findMany({
      include: { _count: { select: { orders: true } } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.order.findMany({
      include: { user: true, items: true },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return (
    <div className='space-y-8'>
      <h2 className='text-2xl font-bold'>Users & Orders</h2>

      <Tabs
        defaultValue='users'
        className='w-full'
      >
        <TabsList className='grid w-full max-w-md grid-cols-2'>
          <TabsTrigger value='users'>Registered Users</TabsTrigger>
          <TabsTrigger value='orders'>Recent Orders</TabsTrigger>
        </TabsList>

        <TabsContent value='users'>
          <Card>
            <CardHeader>
              <CardTitle>Registered Users</CardTitle>
              <CardDescription>
                View all accounts on your platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              {users.length === 0 ? (
                <p className='text-center py-8 text-muted-foreground'>
                  No users found.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Orders</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className='font-mono text-xs'>
                          {user.id.slice(0, 8)}...
                        </TableCell>
                        <TableCell className='font-medium'>
                          {user.name || 'Anonymous'}
                        </TableCell>
                        <TableCell>{user.email || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.role === 'admin' ? 'default' : 'secondary'
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString(
                            'en-US',
                            { year: 'numeric', month: 'short', day: 'numeric' },
                          )}
                        </TableCell>
                        <TableCell>{user._count.orders}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='orders'>
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Track customer purchases and fulfillment status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <p className='text-center py-8 text-muted-foreground'>
                  No orders yet.
                </p>
              ) : (
                <AdminOrdersTable orders={orders} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
