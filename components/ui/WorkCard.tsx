"use client"

import { motion } from 'motion/react'
import { SpotlightText } from './SpotlightText';


function WorkCard({ icon, title, describe }: { icon: React.ReactNode, title: string, describe: string}) {
     return (
          <div className="flex flex-col max-w-52 md:max-w-96  justify-start  items-start space-y-4 text-center">
               <div className='w-full flex flex-col justify-center items-center font-bold text-2xl gap-y-4'>
                    <motion.div
                         initial={{ scale: 1 }}
                         animate={{ scale: [1, 1.1, 1, 0.95, 1] }}
                         transition={{
                         duration: 2,
                         repeat: Infinity,
                         ease: "easeInOut",
                         }}
                         className="text-white drop-shadow-[0_0_6px_rgba(167,139,250,0.85)]"
                         >
                         {icon}
                    </motion.div>

                    {title}
                    </div>
               <div className="text-lg">
                    <SpotlightText>
                         {describe}
                    </SpotlightText>
               </div>
          </div>
     )
}

export default WorkCard