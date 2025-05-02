import Header from '@/components/ui/Header'
import Sections from '@/components/ui/Sections'
import Footer from '@/components/ui/Footer';
import { WarpBackground } from "@/components/magicui/warp-background";


function LandingPage(){
    return (
        <WarpBackground perspective={150} beamsPerSide={5} beamSize={8} className='overflow-hidden'>
                <Header />
                <Sections />
                <Footer />
        </WarpBackground>
    );
};


export default LandingPage;