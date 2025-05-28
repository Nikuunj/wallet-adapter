'use client'
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import Logo from "./icons/Logo";


function NavBar() {
    const wallet = useWallet();

    console.log("Wallet connected:", wallet.connected);
    
    return (
        <>
            <div className="flex justify-between items-center p-4 text-white nav"> 
                <div className="text-3xl flex justify-center items-center gap-3">
                    <Logo /> X-AirDrop
                </div>
                <div>
                    {!wallet.connected ? <WalletMultiButton /> : <WalletDisconnectButton />}
                </div>
            </div>
            <hr className="text-gray-300"/>
        </>
    )
}

export default NavBar