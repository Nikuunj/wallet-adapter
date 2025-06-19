"use client"

import { useRef, ReactNode } from "react"
import {
    motion,
    useMotionValue,
    useMotionTemplate,
    animate,
} from "framer-motion"

interface SpotlightTextProps {
    children: ReactNode;
    className?: string;
}

export function SpotlightText({ children, className = "", ...props }: SpotlightTextProps) {
    const maskX = useMotionValue(0)
    const maskY = useMotionValue(0)
    const maskSize = useMotionValue(0)
    const ref = useRef<HTMLDivElement>(null)

    return (
        <div className="relative">
            {/* Base layer - always visible with reduced opacity/darker */}
            <div className={`${className} opacity-45`}>
                {children}
            </div>
            
            {/* Spotlight layer - only visible where mask allows */}
            <motion.div
                ref={ref}
                className={`absolute inset-0 ${className}`}
                onHoverStart={() => {
                    animate(maskSize, 40, {
                        duration: 0.3,
                        ease: "easeOut",
                    })
                }}
                onHoverEnd={() => {
                    animate(maskSize, 0, {
                        duration: 0.3,
                        ease: "easeIn",
                    })
                }}
                onPointerMove={(e) => {
                    if (ref.current) {
                        const { top, left } = ref.current.getBoundingClientRect()
                        maskX.set(e.clientX - left)
                        maskY.set(e.clientY - top)
                    }
                }}
                style={{
                    WebkitMaskImage: useMotionTemplate`radial-gradient(circle ${maskSize}px at ${maskX}px ${maskY}px, black 0%, black 40%, transparent 100%)`,
                    maskImage: useMotionTemplate`radial-gradient(circle ${maskSize}px at ${maskX}px ${maskY}px, black 0%, black 40%, transparent 100%)`,
                }}
                {...props}
            >
                {children}
            </motion.div>
        </div>
    )
}