"use client";
import Button from "@/components/Button";
import InputBox from "@/components/InputBox";
import Loading from "@/components/Loading";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast";

function SendSol() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const refInput = useRef<HTMLInputElement>(null);
    const refAddress = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [maxTransferable, setMaxTransferable] = useState<number>(0);

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
                    // @ts-expect-error: `fromPubkey` expects a PublicKey, but `wallet.publicKey` can be null if the wallet is not connected.
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

    useEffect(() => {
        const fetchBalanceAndFee = async () => {
            try {
                setLoading(true);
                const pubkey = wallet.publicKey;
                // @ts-expect-error: wallet might be null if not connected
                const balance = await connection.getBalance(pubkey);
                console.log("Balance:", balance / LAMPORTS_PER_SOL, "SOL");

                const { blockhash } = await connection.getLatestBlockhash();

                const transaction = new Transaction({
                    recentBlockhash: blockhash,
                    feePayer: pubkey,
                });

                // Dummy transfer to self just to estimate fee
                transaction.add(
                    SystemProgram.transfer({
                        // @ts-expect-error: wallet might be null if not connected
                        fromPubkey: pubkey,
                        // @ts-expect-error: wallet might be null if not connected
                        toPubkey: pubkey,
                        lamports: balance,
                    })
                );

                const fee = await connection.getFeeForMessage(transaction.compileMessage());

                if (fee.value !== null) {
                    const maxTransferable = (balance - fee.value) / LAMPORTS_PER_SOL;
                    setMaxTransferable(maxTransferable);
                } else {
                    console.warn("Could not estimate fee");
                }

            } catch (error) {
                console.error("Error fetching balance or fee:", error);
            } finally {
                setLoading(false);
            } 
        };

        if (wallet && wallet.connected && wallet.publicKey) {
            fetchBalanceAndFee();
        }
    }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4 w-72">
                <div className="text-xl text-white font-semibold tracking-wider">
                    Send SOL
                </div>
                {/*  @ts-expect-error: InputBox expects a generic ref type, but custom prop `reference` doesn't match expected interface. */}
                <InputBox reference={refInput} text={`Amount - Max. ${maxTransferable} SOL`} typeOfInp={'number'}/>
                {/*  @ts-expect-error: InputBox expects a generic ref type, but custom prop `reference` doesn't match expected interface. */}
                <InputBox reference={refAddress} text={'Wallet Address'} typeOfInp={'text'}/>
                <Button text={loading ? "Sending..." : "Send SOL"} handleClick={handleSendSol}/>
            </div>
            
            
            {loading && (
              <Loading />
            )}
        </>
    )
}

export default SendSol