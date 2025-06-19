import { BackgroundBeams } from "./ui/BackgroundBeams "


function HeroSection() {
     return (
          <div className={"h-screen w-screen flex flex-col justify-center items-center text-center"}>
               <div className={"px-2 sm:px-5 md:px-7 lg:px-18 xl:px-56 space-y-4 z-20"}>
                    <p className={"text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"}>
                         Your Ultimate {" "}
                         <span>
                              Solana Wallet
                         </span>
                         {" "} Experience
                    </p>
                    <p className={"text-sm sm:text-lg px-5 sm:px-18 md:px-28 lg:px-44 text-zinc-500"}>
                         Create tokens, mint NFTs, send SOL, sign messages, and manage all your Solana assets in one powerful web application. Full support for mainnet, devnet, and testnet networks.
                    </p>
               </div>

               <BackgroundBeams />
          </div>
     )
}

export default HeroSection