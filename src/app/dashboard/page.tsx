import { AppSidebar } from '@/components/app-sidebar';
import { SearchForm } from '@/components/search-form';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import DiscountProducts from '@/components/discount-products';

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '16rem',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className='flex border-b h-16 shrink-0 items-center justify-center md:justify-between gap-2 px-4'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger className='-ml-1 hover:bg-sidebar-accent' />
          </div>
          <SearchForm className='w-full' />
        </header>

        <div className='flex flex-1 flex-col gap-4 p-4 w-full'>
          {/* Discount Products Section */}
          <DiscountProducts />

          {/* Trending Products Section */}
          <section>
            <h2 className='text-2xl font-bold mb-6'>Trending Products</h2>
            {/* Filters Tabs */}
            <div className='flex justify-center mb-6'>
              <Tabs
                defaultValue='all'
                className='w-full max-w-3xl'
              >
                <div className='overflow-x-auto'>
                  <TabsList className='grid grid-cols-5 w-full min-w-max h-12 rounded-lg bg-muted'>
                    <TabsTrigger
                      value='all'
                      className='min-w-max'
                    >
                      All Items
                    </TabsTrigger>
                    <TabsTrigger
                      value='shoes'
                      className='min-w-max'
                    >
                      Shoes
                    </TabsTrigger>
                    <TabsTrigger
                      value='clothes'
                      className='min-w-max'
                    >
                      Clothes
                    </TabsTrigger>
                    <TabsTrigger
                      value='accessories'
                      className='min-w-max'
                    >
                      Accessories
                    </TabsTrigger>
                    <TabsTrigger
                      value='electronics'
                      className='min-w-max'
                    >
                      Electronics
                    </TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </div>

            <div className='grid auto-rows-min gap-4 lg:grid-cols-4'>
              {[1, 2, 3, 4].map((i) => (
                <Card
                  key={i}
                  className='hover:shadow-lg transition-shadow py-0 pb-5'
                >
                  <CardHeader className='p-0'>
                    <div className='bg-gray-200 border-2 border-dashed rounded-t-lg w-full h-56' />
                  </CardHeader>
                  <CardContent className='pt-4'>
                    <CardTitle className='text-base'>
                      Trending Item {i}
                    </CardTitle>
                    <p className='text-sm text-muted-foreground mt-1'>
                      Most popular this week
                    </p>
                    <p className='mt-3 text-xl font-semibold text-primary'>
                      $129.99
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      variant='outline'
                      className='w-full hover:text-white'
                    >
                      <Link href={''}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
