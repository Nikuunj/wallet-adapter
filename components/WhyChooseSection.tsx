import SecondaryHeader from "./ui/SecondaryHeader"
import { SpotlightText } from "./ui/SpotlightText"

function WhyChooseSection() {
    return (
        <div className="z-20 text-center w-screen space-y-16">
               <div className="space-y-7">

                    <SecondaryHeader startNormalText={"Why Choose"} midColorText={"Our dApp?"} />
                    <SpotlightText className="flex justify-center items-center">
                         <p className={"text-sm sm:text-base md:text-lg w-72 sm:w-96 md:w-lg text-zinc-300 text-center"}>
                              Experience the full power of Solana with our user-friendly interface. No technical knowledge required - just connect your wallet and start managing your digital assets.
                         </p>
                    </SpotlightText>
               </div>
          </div>
    )
}

export default WhyChooseSection