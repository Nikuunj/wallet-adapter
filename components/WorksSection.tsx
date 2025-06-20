import { workHow } from "@/utils/howItWork"
import CornerBorderSpotlight from "./ui/CornerBorderSpotlight"
import SecondaryHeader from "./ui/SecondaryHeader"
import { SpotlightText } from "./ui/SpotlightText"
import WorkCard from "./ui/WorkCard"


function WorksSection() {

    const renderHowWork = workHow.map((step, idx) => (
        <CornerBorderSpotlight key={step.title + idx} className="px-6 py-9 w-fit bg-black/45">
                <WorkCard icon={step.icon} title={step.title}
                    describe={step.description}/>
        </CornerBorderSpotlight>
    ))
    return (
        <div className="z-20 text-center w-screen space-y-10">
            <div className="space-y-5">

                <SecondaryHeader startNormalText={"it Works"} startColorText={"How"}/>
                <SpotlightText className="flex justify-center items-center">
                    <p className={"text-sm sm:text-base md:text-lg w-72 sm:w-96 md:w-lg text-zinc-300 text-center"}>
                    Get started with our Solana dApp in just three simple steps. No downloads or installations required.
                    </p>
                </SpotlightText>
            </div>

            <div className="flex justify-center items-center w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 sm:gap-x-5 md:gap-x-8 px-2">
                        {renderHowWork}
                    </div>
               </div>
        </div>
    )
}

export default WorksSection