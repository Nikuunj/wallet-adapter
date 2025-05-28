
function CardBox({ children }: { children: React.ReactNode }) {
  return (
    <div className=" border border-gray-800 p-16 rounded-lg shadow-lg flex flex-col items-center gap-4 overflow-x-hidden"> 
        {children}
    </div>
  )
}

export default CardBox