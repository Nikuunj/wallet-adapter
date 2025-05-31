"use client";

import Button from "@/components/Button";
import InputBox from "@/components/InputBox";
import Loading from "@/components/Loading";
import { useRef, useState } from "react";


function CreateToken() {

    const refInputArr = useRef<HTMLInputElement[] | null[]>(Array(4).fill(0));
    const [loading, setLoading] = useState<boolean>(false);

    async function createToken() {
        console.log('click me');
        setLoading(false);
        
    }

    return (
        <>
            <div>
                <h1>Create Token</h1>
                
                <Button handleClick={createToken} text={'create token'}/>
                <InputBox reference={(e) => refInputArr.current[0] = e} text={`Massage..`} typeOfInp={'text'}/>
                <InputBox reference={(e) => refInputArr.current[1] = e} text={`Massage..`} typeOfInp={'text'}/>
                <InputBox reference={(e) => refInputArr.current[2] = e} text={`Massage..`} typeOfInp={'text'}/>
                <InputBox reference={(e) => refInputArr.current[3] = e} text={`Massage..`} typeOfInp={'text'}/>
            </div>

            {loading && (
                <Loading />
            )}
        </>
    )
}

export default CreateToken;