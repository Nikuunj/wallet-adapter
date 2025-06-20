import FloatingText from "./FloatingText"


function SecondaryHeader({ startNormalText, secondNormalText, lastNormalText, midColorText, startColorText, lastColorText }: 
     { startNormalText: string; secondNormalText?: string; lastColorText?: string; midColorText?: string; startColorText?: string; lastNormalText?: string }) {
     return (
          <p className={"text-2xl sm:text-4xl md:text-4xl font-bold"}>
               {startColorText && <>
                    <FloatingText text={startColorText} /> 
                    {' '}
               </>}
               {startNormalText}
               {midColorText && <>
                    {' '}
                    <FloatingText text={midColorText} /> 
                    {' '}
               </>}
               {secondNormalText && <>{' '}{secondNormalText}{' '}</> }

               {lastColorText && <>
                    {' '}
                    <FloatingText text={lastColorText} /> 
                    {' '}
               </>}
               {lastNormalText && <>{' '}{lastNormalText}</> }
          </p>
  )
}

export default SecondaryHeader