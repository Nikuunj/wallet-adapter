import { whyChoose } from "@/utils/network"
import SecondaryHeader from "./ui/SecondaryHeader"
import { SpotlightText } from "./ui/SpotlightText"
import CornerBorderSpotlight from "./ui/CornerBorderSpotlight"
import QuickAction from "./ui/QuickAction"

function WhyChooseSection() {
    return (
        <div className="z-20 text-center w-screen space-y-16 flex items-center justify-center">
               <div className="grid sm:grid-cols-2 sm:px-2 space-y-15 sm:space-y-0 sm:gap-x-4 md:gap-x-10">
                    <div className="space-y-7  sm:text-start text-center h-full w-full">

                         <SecondaryHeader startNormalText={"Why Choose"} midColorText={"Our dApp?"} />
                         <SpotlightText className="flex justify-center items-center">
                              <p className={"text-sm sm:text-base md:text-lg w-72 sm:w-96 md:w-lg text-zinc-300 "}>
                                   Experience the full power  of Solana with our user-friendly interface. No technical knowledge required - just connect your wallet and start managing your digital assets.
                              </p>
                         </SpotlightText>
                         <div className="space-y-5 px-2 sm:px-0">
                              {whyChoose.map((resson, idx) => (
                                   <div
                                   key={resson.text + idx} className={"flex gap-2 relative left-0 hover:left-2 duration-300 transition-all items-center"}>
                                        <span className="drop-shadow-[0_0_6px_rgba(167,139,250,0.85)]">
                                             {resson.icon}
                                        </span>
                                        {/* <SpotlightText> */}
                                             <p className="text-sm sm:text-base text-start">
                                                  {resson.text}
                                             </p>
                                        {/* </SpotlightText> */}
                                   </div>
                              ))}
                         </div>
                    </div>

                    <div className="flex justify-center items-center w-full h-full px-2 sm:px-0">
                         <CornerBorderSpotlight className="px-6 py-9 bg-black/45 w-full">
                              <QuickAction />
                         </CornerBorderSpotlight>
                    </div>
               </div>    
          </div>
    )
}

export default WhyChooseSection