import Header from '@/components/ui/Header'
import Sections from '@/components/ui/Sections'
import { WarpBackground } from "@/components/magicui/warp-background";


function LandingPage(){
    return (
        <WarpBackground>
            <div className='w-full h-full'>
                <Header />
                <Sections />
            </div>
        </WarpBackground>
    );
};


export default LandingPage;