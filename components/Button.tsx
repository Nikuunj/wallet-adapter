

function Button({ handleClick, text }: { handleClick?: () => void, text: string |  React.ReactNode }) {
    return (
        <button className={`cursor-pointer capitalize outline-0 bg-gray-200 text-black px-10 py-2 rounded-sm w-full`} onClick={handleClick}>{text}</button>
    )
}

export default Button