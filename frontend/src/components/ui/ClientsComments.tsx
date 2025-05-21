import { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
export default function ClientsComments() {

  const [current, setCurrent] = useState(0);
  const totalItems = 12;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Move to next slide
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalItems);
    }, 3000); // Change slide every 3 seconds

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="min-w-full max-w-sm border text-center"
    >
      <CarouselContent style={{ transform: `translateX(-${(100 / totalItems) * current}%)`, transition: "transform 0.5s ease-in-out" }}>
        {Array.from({ length: 12 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-8">
              <Card className="flex flex-col items-center justify-center px-5 w-50 h-72">
                <CardContent className="flex items-center justify-center p-0 rounded-full w-32 h-32 bg-blue-500 text-white">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
                <h1 className="text-primary text-2xl">client's name</h1>
                <p className="italic text-blue-500">blah blah blah blah blah blah blah blah blah blah blah blah blah </p>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <h1 className="text-4xl text-primary mb-3">Our Client's Comments</h1>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

