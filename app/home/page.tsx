"use client"
import FausetSol from '@/components/FausetSol';
import CardBox from '@/components/CardBox';
import SecondOption from '@/components/SecondOption';
import { useWallet } from '@solana/wallet-adapter-react';

export default function Home() {
    const { connected } = useWallet();


    return (
        <div className="flex flex-col items-center justify-center gap-4 mt-4 px-2">
            <div className='normal flex gap-4 flex-col'>
                <CardBox>
                    <FausetSol />
                </CardBox>
                { connected && <CardBox>
                    <SecondOption />
                </CardBox>}
            </div>
        </div>
    );
}


