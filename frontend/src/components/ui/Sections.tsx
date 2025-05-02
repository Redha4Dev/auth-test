import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Carousel from "./Carousel";
import FeaturesBenefits from "./FeaturesBenefits";
export default function Sections() {
  return (
    <div className="min-h-[1000px] w-full">
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
      <section className="h-[300px]" id="ClientsCommentsSection"></section>
      {/* Pricing sectoin */}
      <section className="h-[600px] bg-[]" id="PriceSection"></section>
    </div>
  );
}
