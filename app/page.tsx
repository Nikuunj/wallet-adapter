'use client';
import { useEffect, useState } from 'react';
import FausetSol from '@/components/FausetSol';
import CardBox from '@/components/CardBox';
import SecondOption from '@/components/SecondOption';


export default function Home() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; 


    return (
    
        <div className="flex flex-col items-center justify-center gap-4 h-[85vh]">

            <div className='normal flex gap-4 flex-col'>
                <CardBox>
                    <FausetSol />
                </CardBox>
                <CardBox>
                    <SecondOption />
                </CardBox>
            </div>
        </div>

    );
}