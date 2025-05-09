import Header from '@/components/ui/Header'
import Sections from '@/components/ui/Sections'
import Footer from '@/components/ui/Footer';
import { WarpBackground } from "@/components/magicui/warp-background";


function LandingPage(){
    return (
        <div className='overflow-hidden'>
            <WarpBackground perspective={150} beamsPerSide={5} beamSize={8} beamDuration={5}>
                    <Header />
                    <Sections />
                    <Footer />
            </WarpBackground>
        </div>
    );
};


export default LandingPage;