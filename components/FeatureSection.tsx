"use client"

import CornerBorderSpotlight from "./ui/CornerBorderSpotlight"
import FeatureCard from "./ui/FeatureCard"
import MagnaticCursor from "./ui/MagnaticCursor"
import SecondaryHeader from "./ui/SecondaryHeader"
import { SpotlightText } from "./ui/SpotlightText"
import { features } from "@/utils/feature"


function FeatureSection() {

     const featureRender = features.map((item, idx) => (
          <CornerBorderSpotlight key={item.description + idx} borderStyle="dashed" className="px-5 py-5 md:px-8 md:py-8 w-fit bg-black/45">
               <FeatureCard icon={item.icon} title={item.title}
               describe={item.description}
               />
          </CornerBorderSpotlight>
     ))

     return (
          <div className="z-20 text-center w-screen space-y-10">
               <div className="space-y-9">
                    <SecondaryHeader startNormalText={"Everything You Need for"}   lastColorText={"Solana"}/>
                    <SpotlightText className="flex justify-center items-center">
                         <p className={"text-sm sm:text-base md:text-lg w-72 sm:w-96 md:w-lg text-zinc-300 text-center"}>
                              Manage your Solana assets, create tokens, and interact with the blockchain through our intuitive web interface.
                         </p>
                    </SpotlightText>
               </div>
               <div className="flex justify-center items-center w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 sm:gap-x-5 md:gap-x-8 px-2 md:grid-cols-3">
                         {featureRender}
                    </div>
               </div>
               <MagnaticCursor/>
          </div>
     )
}


export default FeatureSection