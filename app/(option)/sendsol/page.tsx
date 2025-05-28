"use client";
import Button from "@/components/Button";
import InputBox from "@/components/InputBox";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useRef, useState } from "react"
import toast from "react-hot-toast";

function SendSol() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const refInput = useRef<HTMLInputElement>(null);
    const refAddress = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    async function handleSendSol() {
        const amount = refInput.current?.value ? parseFloat(refInput.current.value) : 0;
        const address = refAddress.current?.value;

        if (!address || !amount || isNaN(amount) || amount <= 0) {
            console.error("Invalid input");
            toast.error("Please enter a valid amount and wallet address.");
            return;
        }

        if (!wallet.connected && !wallet.publicKey) {
            console.error("Wallet not connected");
            toast.error("Please connect your wallet first.");
            return;
        }
        const transaction = new Transaction();
        try {
            setLoading(true);
            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: new PublicKey(address),
                    lamports: amount * LAMPORTS_PER_SOL,
                })
            );
            await wallet.sendTransaction(transaction, connection);
            toast.success(`Successfully sent ${amount} SOL to ${address}`);
        } catch (error) {
            console.error("Error creating transaction:", error);
            toast.error("Transaction failed. Please check the console for details.");
            return;
        } finally {
            setLoading(false);
        }
        
    }
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4 w-72">
                <div className="text-xl text-white font-semibold tracking-wider">
                    Send SOL
                </div>
                {/* @ts-ignore */}
                <InputBox reference={refInput} text={"SOL - Amount"} typeOfInp={'number'}/>
                {/* @ts-ignore */}
                <InputBox reference={refAddress} text={'Wallet Address'} typeOfInp={'text'}/>
                <Button text={loading ? "Sending..." : "Send SOL"} handleClick={handleSendSol}/>
            </div>
            
            { loading && (<div className="fixed flex-col inset-0 flex w-full bg-gray-900/50 items-center justify-center gap-4 h-screen">
                    <div className="text-white">Processing your request...</div>
            </div>) }
        </>
    )
}

export default SendSol