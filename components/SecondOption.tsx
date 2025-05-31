import { useRouter } from "next/navigation";
import Button from "./Button"


function SecondOption() {
    const rounte = useRouter();
    return (
        <div className={"flex flex-col gap-4 w-72"}>
            <Button handleClick={() => rounte.push('/createToken')} text={"Create Token"}/>
            <Button handleClick={() => rounte.push('/sendsol')} text={"Send SOL"}/>
            <Button handleClick={() => rounte.push('/signmsg')} text={"Sign Message"}/>
        </div>
    )
}

export default SecondOption