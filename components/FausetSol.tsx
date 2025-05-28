

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";
import InputBox from "./InputBox";
import Spyder from "./icons/Spyder";

function FausetSol() {
    const { publicKey } = useWallet();
    const  { connection }  = useConnection();
    const refInput = useRef<HTMLInputElement>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);

    const getBalance = useCallback(async () => {
        if (!publicKey) return;
        try {
            const bal = await connection.getBalance(publicKey);
            setBalance(bal);
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    }, [publicKey, connection]);

    const handleAirdrop = async () => {
        const amount = refInput.current?.value ? parseFloat(refInput.current.value) : 0;
        console.log("Airdropping amount:", amount);
        if (!publicKey) {
            console.error("Wallet not connected");
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            toast.error("Please enter a valid amount of SOL to airdrop.");
            return;
        }
        try {
        setLoading(true);
        const latestBlockhash = await connection.getLatestBlockhash();
        const signature = await connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);

        await connection.confirmTransaction({
            signature,
            ...latestBlockhash,
        });

            await getBalance();
            toast.success(`Airdropped ${amount} SOL to ${publicKey.toBase58()}`);
        } catch (e) {
            toast.error("Airdrop failed: code - 429  You've either reached your airdrop limit today or the airdrop faucet has run dry. Please try again later.");   
            console.error("Airdrop failed:", e);
        } finally {
            setLoading(false);
        }  
    };

    useEffect(() => {
        setMounted(true);
        getBalance();
    }, [publicKey, getBalance]);

    if (!mounted) return null; 

    if(!publicKey) {
        return (
        <div className="flex flex-col items-center justify-center gap-4 h-[85vh]">
            <WalletMultiButton />
            Please connect your wallet to use the faucet.
        </div>
    )}

    return (
        <>

                <div className="text-xl text-white ">Wallet Address : <span className="tracking-wider"> {publicKey.toBase58()} </span><br /> 
                    <span className="text-base font-extralight text-gray-500"> Maximum of 2 requests every 8 hours</span>
                </div>
                <div className="w-72">
                    {/*  @ts-expect-error: InputBox expects a generic ref type, but custom prop `reference` doesn't match expected interface. */}
                    <InputBox reference={refInput} text={"SOL - Amount"} />
                </div>
                <div className="w-72">
                    <Button handleClick={handleAirdrop} text={<div className="flex justify-center items-center gap-2"><Spyder/> Air Drop</div>} />
                </div>
                <div>
                    Balance: {balance ? balance / LAMPORTS_PER_SOL : 0} SOL
                </div>

            { loading && (<div className="fixed flex-col inset-0 flex w-full bg-gray-900/50 items-center justify-center gap-4 h-screen">
                <div className="text-white">Processing your request...</div>
            </div>) }
        </>
    );
}

export default FausetSol;
