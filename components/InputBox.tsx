
function InputBox({ reference, text, typeOfInp }: {  reference: React.RefObject<HTMLInputElement>, text: string, typeOfInp: string }) {
  return (
    <input type={typeOfInp}
        className="text-white border outline-0 border-gray-800 rounded-sm px-3 py-2 w-full tracking-wider"
        ref={reference} name="sol" placeholder={text}/>
  )
}

export default InputBox