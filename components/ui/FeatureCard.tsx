import { SpotlightText } from "./SpotlightText"
import { motion } from "framer-motion";


function FeatureCard({ icon, title, describe }: { icon: React.ReactNode, title: string, describe: string}) {
     return (
          <div className="flex flex-col max-w-72 md:max-w-96 text-start  justify-start items-start space-y-4">
               <div className={"font-bold  text-2xl flex items-center justify-start gap-3"}>
                    <motion.span
                         initial={{ y: 0 }}
                         animate={{ y: [0, -3, 0, 3, 0] }}
                         transition={{
                         duration: 2,
                         repeat: Infinity,
                         ease: "easeInOut",
                         }}
                         className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                    >
                         {icon}
                    </motion.span>
                    {title}
               </div>               
               <div className="text-lg z-40">
                    <SpotlightText className="w-full h-full">
                         {describe}
                    </SpotlightText>
               </div>
          </div>
     )
}

export default FeatureCard