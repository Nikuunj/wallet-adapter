import SecondaryHeader from "./ui/SecondaryHeader"
import { SpotlightText } from "./ui/SpotlightText"

function LastSection() {
    return (
        <div className="z-20 text-center w-screen space-y-16">
               <div className="space-y-7">
                <SecondaryHeader startNormalText={"Ready to Explore"} midColorText={"Solana?"} />
                <SpotlightText className="flex justify-center items-center">
                        <p className={"text-sm sm:text-base md:text-lg w-72 sm:w-96 md:w-lg text-zinc-300 text-center"}>
                            Join thousands of users who are already managing their Solana assets and creating tokens with our powerful dApp. No downloads, no setup - just connect and start using.
                        </p>
                </SpotlightText>
            </div>
        </div>
    )
}

export default LastSection