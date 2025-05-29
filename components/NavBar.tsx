'use client';
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import Logo from "./icons/Logo";


function NavBar() {
    const wallet = useWallet();
    
    return (
        <>
            <div className="flex justify-between items-center py-2  px-5 text-white nav "> 
                <div className="text-base sm:text-3xl flex justify-center items-center gap-1 sm:gap-3">
                    <Logo /> X-AirDrop
                </div>
                <div>
                    <div>
                        {!wallet.connected ? <WalletMultiButton /> : <WalletDisconnectButton />}
                    </div>
                    <div className="text-end ">
                        Devnet
                    </div>
                </div>
            </div>
            <hr className="text-gray-300"/>
        </>
    )
}

export default NavBar