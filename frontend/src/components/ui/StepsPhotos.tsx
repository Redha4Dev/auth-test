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
        src='https://lottie.host/873a174e-ad13-4cb3-b909-3ef9034ba5fc/fqRnG6Ts3m.lottie'
        loop
        autoplay
        speed={2}
        />
    )
}

export function ThirdStepsPhoto() {
    return (
        <DotLottieReact
            src='https://lottie.host/2f853d7e-d6a5-4a8b-b76b-0e8163b4d1b8/eB2knLS2YE.lottie'
            loop
            autoplay
        />
    )
}

// export {FirstStepsPhoto, SecondStepsPhoto, ThirdStepsPhoto};