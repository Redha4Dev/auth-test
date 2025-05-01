import Header from '@/components/ui/Header'
import Sections from '@/components/ui/Sections'
import { WarpBackground } from "@/components/magicui/warp-background";


function LandingPage(){
    return (
        <WarpBackground perspective={150} beamsPerSide={5} beamSize={8}>
                <Header />
                <Sections />
        </WarpBackground>
    );
};


export default LandingPage;