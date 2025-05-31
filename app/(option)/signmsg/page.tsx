"use client";

import Button from '@/components/Button';
import InputBox from '@/components/InputBox';
import Loading from '@/components/Loading';
import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { useRef, useState } from 'react';

function SignMsg() {

    const { publicKey, signMessage } = useWallet();
    const refInput = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);


    async function onClick() {


        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');

        setLoading(true);
        const message = refInput.current?.value || '';
        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
        alert(`Message signature: ${bs58.encode(signature)}`);
        setLoading(false);
    };


    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4 w-72">
                <div className="text-xl text-white font-semibold tracking-wider">
                    Sign Massage
                </div>
                <InputBox reference={(e) => refInput.current = e} text={`Massage..`} typeOfInp={'text'}/>
                <Button text={loading ? "Signing..." : "Sign"} handleClick={onClick}/>
            </div>
            
            
            {loading && (
              <Loading />
            )}
        </>
    )
}

export default SignMsg