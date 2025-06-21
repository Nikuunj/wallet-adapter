"use client";

import Button from "@/components/Button";
import InputBox from "@/components/InputBox";
import Loading from "@/components/Loader";
import { createAssociatedTokenAccountInstruction, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, createMintToInstruction, ExtensionType, getAssociatedTokenAddressSync, getMintLen, LENGTH_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";
import axios from "axios";

function CreateToken() {

    const refInputArr = useRef<HTMLInputElement[] | null[]>(Array(4).fill(0));
    const refMint = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const wallet = useWallet();
    const [token, setToken] = useState<string>('');
    const { connection } = useConnection();
    const [mintAddress, setMintAddress] = useState<PublicKey>();

    async function createToken() {
        if (!wallet.connected || !wallet.publicKey) {
            console.error("Wallet not connected");
            return;
        }
        const tokenName = refInputArr.current[0]?.value;
        const tokenSymbol = refInputArr.current[1]?.value;
        const tokenImageUrl = refInputArr.current[2]?.value;
        const description = refInputArr.current[3]?.value;

        if (!tokenName || !tokenSymbol || !tokenImageUrl || !description) {
            console.error("Please fill in all fields");
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);
            const mintkeyPair = Keypair.generate();
            const res = await axios.post('/api/store-uri-data' ,  {
                name: tokenName,
                symbol: tokenSymbol,
                image: tokenImageUrl,
                description: description,
            });
            const uri = await res.data.url;
            
            const metadata = {
                mint: mintkeyPair.publicKey,
                name: tokenName,
                symbol: tokenSymbol,
                uri: uri,
                additionalMetadata: [],
            };
            const mintLen = getMintLen([ExtensionType.MetadataPointer]);
            const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
            const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);
            const transaction = new Transaction();
            transaction.add(
                SystemProgram.createAccount ({
                    fromPubkey: wallet.publicKey,
                    newAccountPubkey: mintkeyPair.publicKey,
                    space: mintLen,
                    lamports,
                    programId: TOKEN_2022_PROGRAM_ID,
                }),
                createInitializeMetadataPointerInstruction(
                    mintkeyPair.publicKey, 
                    wallet.publicKey, 
                    mintkeyPair.publicKey, 
                    TOKEN_2022_PROGRAM_ID
                ),
                createInitializeMintInstruction(
                    mintkeyPair.publicKey, 
                    9, 
                    wallet.publicKey, 
                    null, 
                    TOKEN_2022_PROGRAM_ID
                ),
                createInitializeInstruction({
                    programId: TOKEN_2022_PROGRAM_ID,
                    mint: mintkeyPair.publicKey,
                    metadata: mintkeyPair.publicKey,
                    name: metadata.name,
                    symbol: metadata.symbol,
                    uri: metadata.uri,
                    mintAuthority: wallet.publicKey,
                    updateAuthority: wallet.publicKey,
                }),
            );
            transaction.feePayer = wallet.publicKey;
            const recentBlock = await connection.getLatestBlockhash();
            transaction.recentBlockhash = recentBlock.blockhash;
            transaction.partialSign(mintkeyPair);
            const sign = await wallet.sendTransaction(transaction, connection);
            console.log("Transaction signature:", sign);
            console.log(mintkeyPair.publicKey.toBase58());
            setMintAddress(mintkeyPair.publicKey);
            setToken(mintkeyPair.publicKey.toBase58());
        } catch (error) {
            console.error("Error creating token:", error);
            toast.error("Failed to create token. Please check the console for details.");
            return;
        } finally {
            setLoading(false);
        }    
    }

    async function mintToken(){

        const mintAmout = refMint.current?.value;
        
        if(!mintAmout) { 
            console.error("Enter mint amout");
            toast.error('Enter Minting Amout');
            return;
        }
        if (!wallet.connected || !wallet.publicKey || !mintAddress) {
            console.error("Token not minted / Wallet is not connected");
            return;
        }
        
        try {
            setLoading(true)
            const associatedToken = getAssociatedTokenAddressSync(
                mintAddress,
                wallet.publicKey,
                false,
                TOKEN_2022_PROGRAM_ID,
            );

        const transaction2 = new Transaction().add(
            createAssociatedTokenAccountInstruction(
                wallet.publicKey,
                associatedToken,
                wallet.publicKey,
                mintAddress,
                TOKEN_2022_PROGRAM_ID,
            ),
        );
        
        await wallet.sendTransaction(transaction2, connection);

        const transaction3 = new Transaction().add(
            createMintToInstruction(mintAddress, 
                associatedToken, 
                wallet.publicKey, 
                parseInt(mintAmout) * LAMPORTS_PER_SOL, 
                [], 
                TOKEN_2022_PROGRAM_ID)
        );

        await wallet.sendTransaction(transaction3, connection);

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
                    <Button handleClick={createToken} text={'create token'}/>
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
                        <Button handleClick={mintToken} text={'Mint Token'} />
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