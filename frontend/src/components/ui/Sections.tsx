import PricingTable from "./PriceTable";
import Carousel from "./Carousela";
import FeaturesBenefits from "./FeaturesBenefits";
import ClientsComments from "./ClientsComments";
import KindergartenModel from "./modelForHeroSection";
export default function Sections() {
  return (
    <div className="min-h-[1000px] w-full space-y-28">
      {/* Hero Section */}
      <section className="h-[600px]">
        <KindergartenModel />
      </section>
      {/* Features & Benefits Section */}
      <section className="min-h-[600px] flex flex-col p-10 items-center text-center">
        <FeaturesBenefits/>
      </section>
      {/*  how to use sectoin */}
      <section className="h-[600px]" id="HowToUseSection">
        <Carousel />
      </section>
      {/* clients comments sectoin */}
      <section className="min-h-[100px]" id="ClientsCommentsSection">
        <ClientsComments />
      </section>
      {/* Pricing sectoin */}
      <section className="min-h-[600px]" id="PriceSection">
        <PricingTable />
      </section>
    </div>
  );
}
