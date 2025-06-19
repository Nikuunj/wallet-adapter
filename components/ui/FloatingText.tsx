

function FloatingText({ text }: { text: string }) {
  return (
    <span className={"bg-gradient-to-b from-pink-500 to-violet-500 bg-clip-text text-transparent"}>{text}</span>
  )
}

export default FloatingText