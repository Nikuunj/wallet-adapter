'use client';
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import Logo from "./icons/Logo";
import { useSolanaNetwork } from "./WalletContexProvide";
import Button from "./Button";


function NavBar() {
    const wallet = useWallet();
    const solanaContext = useSolanaNetwork();

    console.log("Network:", solanaContext.network);
    return (
        <>
            <div className="flex justify-between items-center py-2  px-5 text-white nav w-screen "> 
                <div className="text-base sm:text-3xl flex justify-center items-center gap-1 sm:gap-3">
                    <Logo /> X-AirDrop
                </div>
                <div>
                    <div>
                        {!wallet.connected ? <WalletMultiButton /> : <WalletDisconnectButton />}
                    </div>
                    <div className="text-end capitalize cursor-pointer" onClick={() => solanaContext.toggleNetwork()}>
                        {solanaContext.network}
                    </div>
                </div>
            </div>
            <hr className="text-gray-300"/>
            
            <div className=" flex justify-start items-center mt-3 px-5 tracking-wider nav ">
                <div className="flex justify-center items-center gap-2">
                    <div>
                        <Button text={solanaContext.network} handleClick={solanaContext.toggleNetwork}/>
                    </div>
                    <div>
                        {'<'}- Click to change network
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar