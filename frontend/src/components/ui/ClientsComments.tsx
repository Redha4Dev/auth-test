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

  const clients = [
    {
      name: "Alice Johnson",
      comment: "The service was fantastic and exceeded all my expectations!",
    },
    {
      name: "Michael Smith",
      comment: "Reliable and professional, I would recommend them to anyone.",
    },
    {
      name: "Sara Williams",
      comment: "Very happy with the experience, top-notch quality!",
    },
    {
      name: "David Lee",
      comment: "Great customer support and fast delivery!",
    },
    {
      name: "Emily Brown",
      comment: "They went above and beyond for us. Truly appreciated!",
    },
    {
      name: "John Doe",
      comment: "Affordable and trustworthy. Will come back again.",
    },
    {
      name: "Karen Green",
      comment: "Communication was clear, and the team was great to work with.",
    },
    {
      name: "Chris White",
      comment: "Excellent service from start to finish!",
    },
    {
      name: "Linda Black",
      comment: "They delivered exactly what we needed. Impressive!",
    },
    {
      name: "James Davis",
      comment: "Really responsive and the results speak for themselves.",
    },
    {
      name: "Patricia Hall",
      comment: "A pleasure to work with. Highly recommended!",
    },
    {
      name: "Robert Clark",
      comment: "Solid performance and great value for the price.",
    },
  ];
  
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
      {clients.map((client, index) => (
        <CarouselItem key={index} className="md:basis-1/ lg:basis-1/3">
          <div className="p-8">
            <Card className="flex flex-col items-center justify-center px-5 w-50 h-72">
              <h1 className="text-primary text-2xl">{client.name}</h1>
              <p className="italic text-blue-500">{client.comment}</p>
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

