"use client"

import Button from "@/components/Button";
import InputBox from "@/components/InputBox";
import { mintToken } from "@/utils/createOrMint";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../loading";

function MintToken() {
    const refMintAmount = useRef<HTMLInputElement | null>(null);
    const refMintAdress = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const wallet = useWallet();
    const { connection } = useConnection();


        async function handleMintToken(){

        const mintAmout = refMintAmount.current?.value;
        const mintAddress = refMintAdress.current?.value;

        if(!mintAddress) {
            toast.error('please write token address')
            return
        }
        const publicKeyToken = new PublicKey(mintAddress)
        try {
            setLoading(true)    
            await mintToken({
                amount: mintAmout,
                tokenAddress: publicKeyToken,
                connection,
                wallet
            })
            console.log("Minted!")
        } catch(error) {
            console.error("Error Minting token:", error);
            toast.error("Failed to mint token. Please check the console for details.");
        } finally {
            setLoading(false)
        }   
    }
    return (
        <>
            
            <div className="flex flex-col items-center justify-center gap-5 w-72">
            <div className="font-bold text-2xl  tracking-wide text-center">
                Mint Token
            </div>
                    <div className="w-72 gap-5 flex flex-col">
                        <InputBox reference={(e) => refMintAdress.current = e} text={`Token Address`} typeOfInp={'text'}/>
                        <InputBox reference={(e) => refMintAmount.current = e} text={`Mint Amount`} typeOfInp={'Number'}/>
                        <Button handleClick={handleMintToken} text={'Mint Token'} />
                    </div>
            </div>

            {loading && (
                <Loading />
            )}
        </>
    )
}

export default MintToken