'use client';
import logo from "../../assets/Logo.svg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Header({}) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if(el) {
      el.scrollIntoView({behavior : 'smooth'});
    }
  };
  const navigate = useNavigate()
  return (
    <header className="fixed z-50 top-0 left-0 bg-gray-700 bg-opacity-30 w-full min-h-[95px] shadow-lg grid grid-cols-8 items-center px-8 bg-opacity-4">
  {/* Logo (Left Corner) */}
  <div className="col-span-1 flex items-center justify-start">
    <img src={logo} alt="Logo" className="h-[80px] w-[80px]" />
  </div>

  {/* Buttons (Right Corner) */}
  <div className="col-span-4 col-start-5 flex items-center justify-end text-[customPurple]">
    <div className="flex gap-4">
    <Button className="min-w-24" variant='link' onClick={()=>scrollTo("HowToUseSection")} >How To use Our Service</Button>
    <Button className="min-w-24" variant='link' onClick={()=>scrollTo("ClientsCommentsSection")} >Our Clients Comments</Button>
    <Button className="min-w-24" variant='link' onClick={()=>scrollTo("PriceSection")} >Price Plans</Button>
    <Button className="w-24" onClick={() => navigate('/Dashboard')} >Get Started</Button>
    </div>
  </div>
</header>

  );
}
