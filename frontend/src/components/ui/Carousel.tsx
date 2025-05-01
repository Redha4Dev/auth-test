import { useState , useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { UnlockAnimation , SecondStepsPhoto , ThirdStepsPhoto } from "./StepsPhotos";

const slides = [
  { id: 1, title: "Step 1: Buy the Service" , headline: "Unlock Seamless Childcare Management", subtext: "Purchase the service to get started.", photo: UnlockAnimation },
  { id: 2, title: "Step 2: Send Links", headline: "Effortless Parent Onboarding" , subtext: "Send links to parents for app download & account creation.", photo: SecondStepsPhoto },
  { id: 3, title: "Step 3: Create Folders", headline: "Smart Organization for Every Child" , subtext: "Organize children folders for each parent.", photo: ThirdStepsPhoto }
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };
//   the automatically //
//   useEffect(() => {
//     const interval = setInterval(() => {
//         setCurrent((prev) => (prev + 1) % slides.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

  return (
    <div className="relative w-full h-[90%] mx-auto">
      <div className="overflow-hidden relative rounded-lg w-full h-full ">
        {slides.map((slide, index) => (
          < div 
          key={slide.id}
          className ={`${index === current ? "opacity-100 scale-100" : "opacity-0 scale-95"} flex flex-col w-full h-full absolute top-0 left-0 items-center justify-center text-center p-6 transform transition-all duration-1000 ease-in-out`}>
            <div className={`grid grid-cols-3 gap-4 min-h-[90%] w-full `}>
            <div className={` content-center`}>
            <Card className="min-h-[50%] bg-opacity-50">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{slide.headline}</CardTitle>
              </CardHeader>
              <CardContent>
              <p className="mt-2 text-lg">{slide.subtext}</p>
              <h1 className="text-s mt-20 [text-shadow:1px_1px_0_#000,2px_2px_5px_rgba(0,0,0,5)] text-[white]">{slide.title}</h1>
              </CardContent>

            </Card>
              
              </div>
              <div className={`col-span-2`}>
                <slide.photo />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots for navigation */}
      <div className="flex justify-center space-x-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current ? "bg-gray-900" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
