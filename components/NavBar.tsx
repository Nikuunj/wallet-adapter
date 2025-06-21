'use client';
// import { useWallet } from "@solana/wallet-adapter-react";
// import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
// import { useSolanaNetwork } from "./WalletContexProvide";
import { Menu } from "lucide-react";


function NavBar() {
    // const wallet = useWallet();
    // const solanaContext = useSolanaNetwork();

    // console.log("Network:", solanaContext.network);
    return (
        <div className=" fixed z-50  w-full px-3 py-2 md:px-5 md:py-3 flex  justify-between items-center backdrop-blur-xs bg-gradient-to-t from-white/3 to-black/50">
            <div className="logo-text font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase flex -space-x-1.5 sm:-space-x-2 md:-space-x-2.5 bg-gradient-to-r from-[#6C00FF] via-[#B100E8] to-[#00F0FF] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(0,255,255,0.25)]">
                <div >
                    x
                </div>
                <div className="">
                    a
                </div>
            </div>

            <div className="">
                <Menu className="h-6.5 w-6.5 sm:w-7.5 sm:h-7.5 md:w-9 md:h-9 drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]"/>
            </div>
        </div>
    )
}

export default NavBar