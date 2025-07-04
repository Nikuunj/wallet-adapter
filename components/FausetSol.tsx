import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";
import InputBox from "./InputBox";
import Spyder from "./icons/Spyder";
import Loading from "./Loader";
import { useSolanaNetwork } from "./WalletContexProvide";

function FausetSol() {
    const { publicKey } = useWallet();
    const  { connection }  = useConnection();
    const refInput = useRef<HTMLInputElement>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const { network } = useSolanaNetwork();

    const getBalance = useCallback(async () => {
        if (!publicKey) return;
        try {
            setLoading(true);
            const bal = await connection.getBalance(publicKey);
            setBalance(bal);
        } catch (error) {
            console.error("Error fetching balance:", error);
        } finally {
            setLoading(false);
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



    return (
        <div className="flex flex-col items-center justify-center gap-5">

            <div className="text-xl text-white text-wrap break-words w-72">Wallet Address : <span className="tracking-wider"> {publicKey && publicKey.toBase58()} </span><br /> 
                <span className="text-base font-extralight text-gray-500"> Maximum of 2 requests every 8 hours</span>
            </div>
            <div className="w-72">
                <InputBox reference={(e) => refInput.current = e} text={"SOL - Amount"} typeOfInp={"text"}/>
            </div>
            <div className={`w-72`}>
                <Button handleClick={network === 'mainnet' ? () => toast.error('Only Happen on Devnet or Testnet') : handleAirdrop} text={<div className={`flex justify-center items-center gap-2  ${network !== 'mainnet' && 'cursor-not-allowed'}`}><Spyder/> Air Drop</div>} />
            </div>
            <div>
                Balance: {balance ? balance / LAMPORTS_PER_SOL : 0} SOL
            </div>

            {loading && (
              <Loading />
            )}
        </div>
    );
}

export default FausetSol;
