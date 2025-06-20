"use client"

import { motion } from "framer-motion"
import { Coins, Send, Sparkles, Wallet, Zap } from "lucide-react"

function QuickAction() {
  const actions = [
    { 
      icon: Wallet, 
      text: "Connect Wallet",
      iconColor: "text-blue-400",
    },
    { 
      icon: Coins, 
      text: "Create New Token",
      iconColor: "text-yellow-400",
    },
    { 
      icon: Send, 
      text: "Send SOL",
      iconColor: "text-green-400",
    },
    { 
      icon: Zap, 
      text: "Get Test SOL",
      iconColor: "text-purple-400",
    },
  ]

  return (
    <div className="space-y-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        // viewport={{ once: true }}
        className="text-center mb-4"
      >
        <h3 className="text-xl font-semibold text-white mb-2 text-start flex gap-2 items-center">
          <Sparkles className="h-5 w-5 text-yellow-500 drop-shadow-[0_0_6px_rgba(167,139,250,0.85)]" /> Quick Actions
        </h3>
      </motion.div>

      {actions.map((action, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ 
            delay: index * 0.1 + 0.3,
            duration: 0.5,
            ease: "easeOut"
          }}
          // viewport={{ once: true }}
          className="w-full"
        >
          <motion.button
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full group relative overflow-hidden rounded-lg border border-zinc-700/50 hover:border-zinc-600/70 transition-all duration-300"
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r transition-all duration-300`} />
            
            {/* Animated shimmer effect */}
            <motion.div
              className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
              animate={{ x: [-100, 300] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
                delay: index * 0.5,
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-start p-4 space-x-3">
              <div className={`${action.iconColor} drop-shadow-[0_0_8px_currentColor] transition-all duration-300`}>
                <action.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-white font-medium text-sm group-hover:text-zinc-100 transition-colors duration-200">
                  {action.text}
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg 
                  className="w-4 h-4 text-zinc-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Bottom border glow effect */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-zinc-400 to-transparent group-hover:w-full transition-all duration-500" />
          </motion.button>
        </motion.div>
      ))}
    </div>
  )
}

export default QuickAction