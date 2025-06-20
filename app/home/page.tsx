import HeroSection from "@/components/HeroSection"
import FeatureSection from "@/components/FeatureSection"
import WorksSection from "@/components/WorksSection"
import { GridSmallBackground } from "@/components/ui/GridSmallBackground"
import NetworkSection from "@/components/NetworkSection"

function page() {
     return (
          <div>
               <HeroSection />
               <div className="">
                    <GridSmallBackground />
                    <div className="h-10 bg-gradient-to-b w-screen from-black via-black/60 to-transparent z-50 relative" />
                    <div className="z-50 relative space-y-28">
                         <FeatureSection />
                         <WorksSection />
                         <NetworkSection />
                    </div>
               </div>
          </div>
     )
}

export default page