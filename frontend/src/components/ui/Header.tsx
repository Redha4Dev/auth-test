'use client';
import log from "../../assets/Logo.png"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Header({}) {
  const scrollTo = (id:any) => {
    const el = document.getElementById(id);
    if(el) {
      el.scrollIntoView({behavior : 'smooth'});
    }
  };
  const navigate = useNavigate()
  return (
    <header className="z-50 top-0 left-0 bg-gray-700 bg-opacity-30 w-full min-h-[65px] shadow-lg grid grid-cols-8 items-center px-8 bg-white">
  <div className="col-span-1 flex items-center justify-start">
    <img src={log} alt="Logo" className="h-[80px] w-[80px]" />
  </div>
  <div className="col-span-4 col-start-5 flex items-center justify-end text-[customPurple]">
    <div className="flex gap-4">
    <Button className="min-w-24 hover:underline font-bold" variant='link' onClick={()=>scrollTo("HowToUseSection")} >How To use Our Service</Button>
    <Button className="min-w-24 hover:underline font-bold" variant='link' onClick={()=>scrollTo("ClientsCommentsSection")} >Our Clients Comments</Button>
    <Button className="min-w-24 hover:underline font-bold" variant='link' onClick={()=>scrollTo("PriceSection")} >Price Plans</Button>
    <Button className="w-24 hover:underline" onClick={() => navigate('/SignUp')} >Get Started</Button>
    </div>
  </div>
</header>

  );
}
