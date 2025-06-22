import HeroSection from "@/components/HeroSection"
import FeatureSection from "@/components/FeatureSection"
import WorksSection from "@/components/WorksSection"
import { GridSmallBackground } from "@/components/ui/GridSmallBackground"
import NetworkSection from "@/components/NetworkSection"
import WhyChooseSection from "@/components/WhyChooseSection"
import LastSection from "@/components/LastSection"

function page() {
     return (
          <div className="flex flex-col">
               <HeroSection />
               <div className="">
                    <GridSmallBackground />
                    <div className="h-10 bg-gradient-to-b w-screen from-black via-black/60 to-transparent z-20 relative" />
                    <div className="z-20 relative space-y-28">
                         <FeatureSection />
                         <WorksSection />
                         <NetworkSection />
                         <WhyChooseSection />
                         <LastSection />
                         <div />
                    </div>
               </div>
          </div>
     )
}

export default page