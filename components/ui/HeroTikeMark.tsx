import { CheckCircle } from 'lucide-react'

function HeroTikeMark({ strArr }: { strArr: string[] }) {
     const renderText = strArr.map((str, idx) => (
          <span key={str + idx} className='flex justify-center items-center w-fit'><CheckCircle  className="h-4 w-4 mr-2 text-green-500"/> {str}{" "}</span> 
     ))
     return (
          <div className="space-x-0 sm:space-x-16 gap-1 sm:gap-0 flex justify-center items-center">{renderText}</div>
     )
}

export default HeroTikeMark