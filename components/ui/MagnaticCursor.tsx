"use client"

import { motion, useMotionValue, useSpring } from "motion/react"
import { useEffect } from "react";

function MagnaticCursor() {
     const cursorSize =  5;

     const mouse = {
          x: useMotionValue(0),
          y: useMotionValue(0)
     }



     const smoothOptions = {damping: 20, stiffness: 300, mass: 0.5}
     const smoothMouse = {
          x: useSpring(mouse.x, smoothOptions),
          y: useSpring(mouse.y, smoothOptions)
     }

     const manageMouseMove = (e: MouseEvent  ) => {
          const { clientX, clientY } = e;
          //move custom cursor to center of refElement
          mouse.x.set(clientX - cursorSize / 2);
          mouse.y.set(clientY - cursorSize / 2);
     
     }

     useEffect( () => {
          window.addEventListener("mousemove", manageMouseMove);
          return () => {
               window.removeEventListener("mousemove", manageMouseMove)
          }
     }, [])

     return (

          <div>
               <motion.div 
                    style={{
                         left: smoothMouse.x, 
                         top: smoothMouse.y,
                    }} 
                     animate={{
                         width: cursorSize,
                         height: cursorSize
                    }}
                    className="fixed z-50 w-[5px] h-[5px] bg-white pointer-events-none rounded-full"

               >
               </motion.div>
          </div>

     )
}

export default MagnaticCursor