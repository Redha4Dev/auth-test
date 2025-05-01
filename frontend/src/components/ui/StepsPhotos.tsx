import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {motion} from "framer-motion";
import { Scale } from 'lucide-react';
// import { Canvas } from "@react-three/fiber";
// import { useSpring, animated } from "@react-spring/three";
// import { OrbitControls } from "@react-three/drei";

export function UnlockAnimation() {
    return (
        <DotLottieReact
        src="https://lottie.host/d03ed4ba-d954-4392-9152-1a4789fdcff1/cmQaVIQFIY.lottie"
        loop
        autoplay
      />
  )
};


export function SecondStepsPhoto() {
    return (
        <DotLottieReact
      src="https://lottie.host/d0801186-af58-4ac6-8d41-2ece2c19647f/A2BUF0YSHx.lottie"
      loop
      autoplay
    />
    )
}

export function ThirdStepsPhoto() {
    return (
        <div>  {/* className="flex justify-center items-center"> */} 
            {/* <img src={ChatBubble} alt="Chat Bubble" className="w-[100px] h-[100px]"/>
            <img src={Calendar} alt="Calendar" className="w-[100px] h-[100px]"/>
            <img src={Folder} alt="Folder" className="w-[100px] h-[100px]"/>
            <img src={ShoppingCart} alt="Shopping Cart" className="w-[100px] h-[100px]"/> */}
            <h1 className="text-9xl">Third</h1>
        </div>
    )
}

// export {FirstStepsPhoto, SecondStepsPhoto, ThirdStepsPhoto};