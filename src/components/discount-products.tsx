"use client";

import * as React from "react"; // <-- Added for ref
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay"; // <-- Added
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // <-- Added

const DiscountProducts = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Discount Products</h2>
      <Carousel
        plugins={[plugin.current]}
        className="w-full relative px-10 md:px-12 lg:px-16"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CarouselItem
              key={i}
              className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <Card className="relative overflow-hidden hover:shadow-lg transition-shadow py-0 pb-5 h-full flex flex-col">
                <CardHeader className="p-0">
                  <div className="bg-gray-200 border-2 border-dashed rounded-t-lg w-full h-64" />
                </CardHeader>
                <CardContent className="pt-4 grow">
                  <CardTitle className="text-lg">Premium Product {i}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    Limited time offer – save up to 50%!
                  </p>
                  <div className="mt-4">
                    <span className="text-2xl font-bold text-primary">
                      $99.99
                    </span>
                    <span className="ml-2 text-sm line-through text-muted-foreground">
                      $199.99
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="w-full mt-auto">
                  <Button
                    asChild
                    variant="secondary"
                    className="bg-white text-primary border border-primary hover:bg-primary hover:text-white shadow-md w-full"
                  >
                    <Link href={""}>Order Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 focus:text-white hover:text-white size-9" />
        <CarouselNext className="right-4 focus:text-white hover:text-white size-9" />
      </Carousel>
    </section>
  );
};

export default DiscountProducts;
