"use client"
import CornerBorderBox from "./ui/CornerBorderBox"
import FloatingText from "./ui/FloatingText"
import { GridSmallBackground } from "./ui/GridSmallBackground"
import MagnaticCursor from "./ui/MagnaticCursor"
import { SpotlightText } from "./ui/SpotlightText"


function SecondSection() {

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
                    <div className="flex justify-center ">
                         <CornerBorderBox className="p-4 w-fit">
                              This box has corner borders
                         </CornerBorderBox>
                    </div>
                    <MagnaticCursor/>
               </div>
               <GridSmallBackground />
          </div>
     )
}


export default SecondSection