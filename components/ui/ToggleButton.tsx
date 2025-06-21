"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface ToggleButtonProps {
     isOn: boolean;
     toggleSwitch: () => void;
}

export default function ToggleButton({ isOn, toggleSwitch }: ToggleButtonProps) {
//     const [isOn, setIsOn] = useState(false)

//     const toggleSwitch = () => setIsOn(!isOn)

    return (   
            <button
                className={`toggle-container flex cursor-pointer outline-0 w-12 h-6 rounded-full items-center px-1 transition-all ${
                    "bg-gradient-to-r from-purple-500 from-45%   to-pink-400 shadow-lg shadow-purple-500/30" 
                }`}
                style={{
                    justifyContent: "flex-" + (isOn ? "end" : "start")
                }}
                onClick={toggleSwitch}
            >
                <motion.div
                   className={`toggle-handle w-4 h-4 rounded-full shadow-md bg-white shadow-white/40 `}
                   layout
                   transition={{
                         type: "spring",
                         stiffness: 50,
                         damping: 8
                   }}
                />
            </button>
    )
}