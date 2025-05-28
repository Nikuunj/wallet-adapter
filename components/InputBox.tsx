
interface InputBoxProps { 
    reference: React.RefObject<HTMLInputElement> | null; 
    text: string; 
    typeOfInp: string 
}

function InputBox({ reference, text, typeOfInp }: InputBoxProps) {
    return (
        <input type={typeOfInp}
              className="text-white border outline-0 border-gray-800 rounded-sm px-3 py-2 w-full tracking-wider"
              ref={reference} name="sol" placeholder={text}/>
    )
}

export default InputBox