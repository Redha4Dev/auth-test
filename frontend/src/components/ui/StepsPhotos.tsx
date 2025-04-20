import ChatBubble from '@/assets/ChatBubble3D.png';
import CalendarModel from '@/assets/Calendar3D.png';
import FolderModel from '@/assets/Folder3D.png';
import ShoppingCartModel from '@/assets/ShoppingCart3D.png';
import {motion} from "framer-motion";
import { Scale } from 'lucide-react';
// import { Canvas } from "@react-three/fiber";
// import { useSpring, animated } from "@react-spring/three";
// import { OrbitControls } from "@react-three/drei";

export function FirstStepsPhoto() {

  return (
  <motion.div
  animate={{opacity:[ 0 , 1 , 0] , scale:[0.8 , 1 , 0.8]}}
  transition={{duration:5 , repeat:Infinity , type:"loop" , ease:"easeInOut"}}

  className="w-full h-full bg-[red] content-center"
  >
   <h1> Hello Motion! </h1>
  </motion.div>
  );
}

//********************************************************************************** */
    // return (
    //     <div className="flex justify-center items-center"> 
    //         <img src={ChatBubble} alt="Chat Bubble" className="w-[100px] h-[100px]"/>
    //         <img src={Calendar} alt="Calendar" className="w-[100px] h-[100px]"/>
    //         <img src={Folder} alt="Folder" className="w-[100px] h-[100px]"/>
    //         <img src={ShoppingCart} alt="Shopping Cart" className="w-[100px] h-[100px]"/>
    //         {/* <h1 className="text-9xl">First</h1> */}
    //     </div>
    // )
    // Animation for items moving out of the cart
//**************************************************************************************** 

//*****************
export function SecondStepsPhoto() {
    return (
        <div>  {/* className="flex justify-center items-center"> */} 
            {/* <img src={ChatBubble} alt="Chat Bubble" className="w-[100px] h-[100px]"/>
            <img src={Calendar} alt="Calendar" className="w-[100px] h-[100px]"/>
            <img src={Folder} alt="Folder" className="w-[100px] h-[100px]"/>
            <img src={ShoppingCart} alt="Shopping Cart" className="w-[100px] h-[100px]"/> */}
            <h1 className="text-9xl">Second</h1>
        </div>
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