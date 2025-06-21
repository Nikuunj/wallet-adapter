"use client"
import { Menu } from "lucide-react";
import { useState } from "react";
import NavSideBar from "./ui/NavSideBar"
import { useRouter } from "next/navigation"
import { BaseWalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { CONNECT_LABELS } from "@/utils/labest";
import HeroButton from "./ui/HeroButton";
import { useWallet } from "@solana/wallet-adapter-react";



function NavBar() {
    const [open, setOpen] = useState<boolean>(false)
    const route = useRouter();
    const wallet = useWallet();

    function handleClick() {
        setOpen(true)
    }

    return (
        
        <div className=" fixed z-50  w-full px-3 py-2 md:px-5 md:py-3 flex  justify-between items-center backdrop-blur-[1.5px] bg-gradient-to-b from-black/60 to-white/3">
            <div className="logo-text font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase flex -space-x-1.5 sm:-space-x-2 md:-space-x-2.5 bg-gradient-to-r from-[#6C00FF] via-[#B100E8] to-[#00F0FF] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(0,255,255,0.25)] cursor-pointer" onClick={() => route.push('/')}>
                <div>
                    x
                </div>
                <div>
                    a
                </div>
            </div>
            <div className={"flex gap-2"}>

                <div className="cursor-pointer flex items-center">
                    <BaseWalletMultiButton labels={CONNECT_LABELS} style={{ background: 'transparent', padding:0, height:'fit-content'}}>
                        <HeroButton extraClass={"px-2 py-1 text-xs"} text={wallet.connected && wallet.publicKey ? wallet.publicKey.toBase58().slice(0,3)+".."+ wallet.publicKey.toBase58().slice(-3)
                            : 'Connect' }/>
                    </BaseWalletMultiButton> 
                </div>
                <div onClick={handleClick} className={"cursor-pointer justify-center"}>
                    <Menu className="h-6.5 w-6.5 sm:w-7.5 sm:h-7.5 md:w-9 md:h-9 drop-shadow-[0_0_6px_rgba(167,139,250,1)]"/>
                </div>
            </div>
            <NavSideBar isOpen={open} closeOpen={setOpen} />
        </div>
    )
}

export default NavBar