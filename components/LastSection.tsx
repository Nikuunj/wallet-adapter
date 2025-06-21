"use client"
import { BaseWalletMultiButton } from "@solana/wallet-adapter-react-ui"
import HeroButton from "./ui/HeroButton"
import SecondaryHeader from "./ui/SecondaryHeader"
import { SpotlightText } from "./ui/SpotlightText"
import { CONNECT_LABELS } from "@/utils/labest"
import { useWallet } from "@solana/wallet-adapter-react"

function LastSection() {
    const wallet = useWallet();
    
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
            <BaseWalletMultiButton labels={CONNECT_LABELS} style={{ background: 'transparent', padding:0, height:'fit-content' }}>
                <HeroButton extraClass={"py-2.5 px-5 text-sm"} text={wallet.connected && wallet.publicKey ? wallet.publicKey.toBase58().slice(0,3)+".."+ wallet.publicKey.toBase58().slice(-3)
                     : 'Connect Wallet' }/>
            </BaseWalletMultiButton> 
        </div>
    )
}

export default LastSection