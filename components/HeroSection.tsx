"use client"

import { CONNECT_LABELS } from "@/utils/labest"
import { BackgroundBeams } from "./ui/BackgroundBeams "
import FloatingText from "./ui/FloatingText"
import HeroButton from "./ui/HeroButton"
import HeroTikeMark from "./ui/HeroTikeMark"
import { PointerHighlight } from "./ui/PointerHighlight"
import { SpotlightText } from "./ui/SpotlightText"
import { BaseWalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
// import { motion } from "framer-motion"

function HeroSection() {
     const wallet = useWallet();

     return (
          <div className={"h-screen w-screen  flex flex-col justify-center items-center text-center "} >
               <div className="h-full w-full absolute top-0 bg-black z-20" />
               <div className={"px-2 sm:px-5 md:px-7 lg:px-18 xl:px-56 space-y-6 z-30 flex flex-col justify-center items-center"}>
                    <p 
                         // initial={{ opacity: 0, y: 20 }}
                         // whileInView={{ opacity: 1, y: 0 }}
                         // transition={{ duration: 0.4 }}
                         // viewport={{ once: true }}
                         className={"text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"}>
                         Your Ultimate {" "}
                         <FloatingText text={'Solana Wallet'} />
                         {" "} <PointerHighlight>Experience</PointerHighlight>
                    </p>
                    <SpotlightText className="flex justify-center items-center z-50 text-center">
                         <p 
                         className={"text-sm sm:text-lg sm:px-5  w-72 sm:w-lg md:w-xl lg:w-2xl  text-zinc-300"}>
                                   Create tokens, mint NFTs, send SOL, sign messages, and manage all your Solana assets in one powerful web application. Full support for mainnet, devnet, and testnet networks.
                         </p>
                    </SpotlightText>
                         <BaseWalletMultiButton labels={CONNECT_LABELS} style={{ background: 'transparent', padding:0, height:'fit-content', alignItems: 'center' }}>
                              <HeroButton extraClass={"py-2.5 px-5 text-sm"} text={wallet.connected && wallet.publicKey ? wallet.publicKey.toBase58().slice(0,3)+".."+ wallet.publicKey.toBase58().slice(-3)
                                   : 'Connect Wallet' }/>
                         </BaseWalletMultiButton> 
                    <div    
                         className={"text-sm sm:text-lg sm:px-5  w-72 sm:w-lg md:w-xl lg:w-2xl  text-zinc-300"}
                    >
                         <HeroTikeMark strArr={['Web-Based dApp', 'No Installation', 'Multi-Network']} />
                    </div>
               </div>
               <BackgroundBeams />
          </div>
     )
}

export default HeroSection