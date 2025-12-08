import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SearchForm } from "@/components/search-form";

import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";

import data from "../../dashboard-3/data.json";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex border-b h-16 shrink-0 items-center justify-between gap-2 px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
          </div>
          <SearchForm />
        </header>
        <div className="flex gap-2 items-center justify-between p-6 my-4">
          <h2 className="text-lg">My Cart</h2>
          <Button
            asChild
            variant={"outline"}
            className="border border-accent hover:text-white py-2 px-4"
          >
            <Link href={""}>Continue Shopping</Link>
          </Button>
        </div>
        <DataTable data={data} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-6 mt-4">
          <div className="border rounded-lg p-4 bg-sidebar">
            <h3 className="border-b p-2">Choose shipping mode</h3>
          </div>
          <div className="border rounded-lg p-4 bg-sidebar">
            <h3 className="border-b p-2">Order Summary</h3>
            <div className="flex flex-col gap-2 items-center justify-center p-2 border-b">
              <div className="flex items-center justify-between w-full gap-2">
                <span>Total Items:</span>
                <span className="font-bold">3</span>
              </div>
              <div className="flex items-center justify-between w-full gap-2">
                <span>Total Price:</span>
                <span className="font-bold">$127,000</span>
              </div>
              <div className="flex items-center justify-between w-full gap-2">
                <span>Tax:</span>
                <span className="font-bold">$2,000</span>
              </div>
            </div>
            <Button className="w-full mt-4 bg-accent text-white">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
