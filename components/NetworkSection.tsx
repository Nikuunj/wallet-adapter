import { networks } from "@/utils/network"
import CornerBorderSpotlight from "./ui/CornerBorderSpotlight"
import SecondaryHeader from "./ui/SecondaryHeader"
import { SpotlightText } from "./ui/SpotlightText"
import WorkCard from "./ui/WorkCard"

function NetworkSection() {
     const renderNetwork = networks.map((net, idx) => (
          <CornerBorderSpotlight borderStyle={'border-dashed'} key={net.name + idx} className=" p-10 h-full w-full bg-black/45">
               <WorkCard icon={net.icon} title={net.name}
                    describe={net.status}/>
          </CornerBorderSpotlight>
    ))
     return (
          <div className="z-20 text-center w-screen space-y-16">
               <div className="space-y-7">
                    <SecondaryHeader startNormalText={"Multi"} midColorText={"Network"} secondNormalText={"Support"}/>
                    <SpotlightText className="flex justify-center items-center">
                         <p className={"text-sm sm:text-base md:text-lg w-72 sm:w-96 md:w-lg text-zinc-300 text-center"}>
                              Seamlessly switch between Solana networks for development, testing, and production deployment.
                         </p>
                    </SpotlightText>
               </div>

               <div className="flex justify-center items-center w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-y-8 sm:gap-x-5 md:gap-x-8 px-2">
                        {renderNetwork}
                    </div>
               </div>

          </div>
     )
}

export default NetworkSection