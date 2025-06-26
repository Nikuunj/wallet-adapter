"use client";

import Button from "@/components/Button";
import InputBox from "@/components/InputBox";
import Loading from "@/components/Loader";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { createToken, mintToken } from "@/utils/createOrMint";

function CreateToken() {

    const refInputArr = useRef<HTMLInputElement[] | null[]>(Array(4).fill(0));
    const refMint = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const wallet = useWallet();
    const [token, setToken] = useState<string>('');
    const { connection } = useConnection();
    const [mintAddress, setMintAddress] = useState<PublicKey>();

    async function handleCreateToken() {
        const tokenName = refInputArr.current[0]?.value;
        const tokenSymbol = refInputArr.current[1]?.value;
        const tokenImageUrl = refInputArr.current[2]?.value;
        const description = refInputArr.current[3]?.value;
        try {    
            setLoading(true);
            const createTkd = await createToken({
                tokenName,
                tokenSymbol,
                tokenImageUrl,
                description,
                wallet,
                connection
            })
            if(createTkd?.pubkey) {
                setMintAddress(createTkd.pubkey);
                setToken(createTkd.pubkey.toBase58());
            }
        } catch (error) {
            console.error("Error creating token:", error);
            toast.error("Failed to create token. Please check the console for details.");
            return;
        } finally {
            setLoading(false);
        }    
    }

    async function handleMintToken(){

        const mintAmout = refMint.current?.value;
    
        try {
            setLoading(true)
            await mintToken({
                amount: mintAmout,
                tokenAddress: mintAddress,
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
                <div className="font-bold text-2xl  tracking-wide">
                    Create Token
                </div>
                
                <div className="w-72 gap-3.5 flex flex-col">
                    <InputBox reference={(e) => refInputArr.current[0] = e} text={`Token Name`} typeOfInp={'text'}/>
                    <InputBox reference={(e) => refInputArr.current[1] = e} text={`Token Symbol`} typeOfInp={'text'}/>
                    <InputBox reference={(e) => refInputArr.current[2] = e} text={`Token Image URL`} typeOfInp={'text'}/>
                    <InputBox reference={(e) => refInputArr.current[3] = e} text={`Description`} typeOfInp={'text'}/>
                    <Button handleClick={handleCreateToken} text={'create token'}/>
                </div>

                {token && <div className="flex flex-col items-center justify-center mt-8 text-white space-y-7">
                    <div className="flex flex-col items-center gap-2">

                        <div className="text-lg font-bold underline decoration-wavy underline-offset-2">

                            Token 
                        </div>
                        <p className="break-words text-wrap w-72">
                            {token}
                        </p>
                    </div>    
                    <div className="w-72 gap-5 flex flex-col">
                        <InputBox reference={(e) => refMint.current = e} text={`Mint Amount`} typeOfInp={'Number'}/>
                        <Button handleClick={handleMintToken} text={'Mint Token'} />
                    </div>
                </div>}
            </div>


            {loading && (
                <Loading />
            )}
        </>
    )
}

export default CreateToken;