import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import PricingTable from "./PriceTable";
import Carousel from "./Carousel";
import FeaturesBenefits from "./FeaturesBenefits";
export default function Sections() {
  return (
    <div className="min-h-[1000px] w-full space-y-96">
      {/* Presentation Section */}
      <section className="h-[600px]"></section>
      {/* Features & Benefits Section */}
      <section className="min-h-[600px] flex flex-col p-10 items-center text-center">
        <FeaturesBenefits/>
      </section>
      {/*  how to use sectoin */}
      <section className="h-[600px]" id="HowToUseSection">
        <Carousel />
      </section>
      {/* clients comments sectoin */}
      <section className="h-[300px] bg-red-800" id="ClientsCommentsSection"></section>
      {/* Pricing sectoin */}
      <section className="min-h-[600px]" id="PriceSection">
        <PricingTable />
      </section>
    </div>
  );
}
