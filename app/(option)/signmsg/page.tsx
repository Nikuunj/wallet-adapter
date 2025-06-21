"use client";

import Button from '@/components/Button';
import InputBox from '@/components/InputBox';
import Loading from '@/components/Loader';
import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { useRef, useState } from 'react';

function SignMsg() {

    const { publicKey, signMessage } = useWallet();
    const refInput = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [resSignMsg, setResSignMsg] = useState<string>('')


    async function onClick() {

        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');

        setLoading(true);
        const message = refInput.current?.value || '';
        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
        alert(`Message signature: ${bs58.encode(signature)}`);
        setResSignMsg(bs58.encode(signature))
        setLoading(false);
    };


    return (
        <>
            <div className="flex flex-col h-full gap-y-6 w-72">
                <div className='flex flex-col items-center justify-center w-full gap-5'>
                    <div className="font-bold text-2xl  tracking-wide">
                        Sign Massage
                    </div>
                    <InputBox reference={(e) => refInput.current = e} text={`Massage..`} typeOfInp={'text'}/>
                    <Button text={loading ? "Signing..." : "Sign"} handleClick={onClick}/>
                </div>

            {resSignMsg && <p className={'text-wrap tracking-tighter break-words'}>
                     {resSignMsg}
                </p>}
            </div>
            {loading && (
              <Loading />
            )}
        </>
    )
}

export default SignMsg