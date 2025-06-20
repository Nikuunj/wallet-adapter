"use client"
import FloatingText from "./FloatingText"
import { motion } from 'motion/react'


function SecondaryHeader({ startNormalText, secondNormalText, lastNormalText, midColorText, startColorText, lastColorText }: 
     { startNormalText: string; secondNormalText?: string; lastColorText?: string; midColorText?: string; startColorText?: string; lastNormalText?: string }) {
     return (
          <motion.p
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className={"text-2xl sm:text-4xl md:text-4xl font-bold"}>
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
          </motion.p>
  )
}

export default SecondaryHeader