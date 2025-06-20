"use client"
import { Coins, FileSignature, Zap } from "lucide-react"
import CornerBorderBox from "./ui/CornerBorderBox"
import FeatureHero from "./ui/FeatureHero"
import FloatingText from "./ui/FloatingText"
import { GridSmallBackground } from "./ui/GridSmallBackground"
import MagnaticCursor from "./ui/MagnaticCursor"
import { SpotlightText } from "./ui/SpotlightText"
import { features } from "@/utils/feature"


function SecondSection() {

     const featureRender = features.map((item, idx) => (
          <CornerBorderBox className="px-5 py-5 md:px-8 md:py-8 w-fit bg-black/45">
               <FeatureHero icon={item.icon} title={item.title}
               describe={item.description}
               />
          </CornerBorderBox>
     ))

     return (
          <div> 
               <div className=" absolute z-20 text-center w-screen space-y-10">
                    <div className="space-y-5">

                         <p className={"text-2xl sm:text-4xl md:text-4xl font-bold"}>
                              Everything You Need for {' '}
                              <FloatingText text={'Solana'} />
                         </p>
                         <SpotlightText className="flex justify-center items-center">
                              <p className={"text-sm sm:text-base md:text-lg w-72 sm:w-96 md:w-lg text-zinc-300"}>
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
               <GridSmallBackground />
          </div>
     )
}


export default SecondSection