"use client"
import BorderCorners from "./BorderCorners";
import BorderSpotlight from "./BorderSpotlight";
import { motion } from "framer-motion"

interface Props {
     children: React.ReactNode;
     className?: string;
     borderStyle?: string
}

const CornerBorderSpotlight: React.FC<Props> = ({ children, borderStyle, className = '' }) => {
     return (
          <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`relative ${className}`}>
               {/* Corner borders on top */}
               <BorderCorners />
               <BorderSpotlight>
                    {/* Box with dotted border under the corners */}
                    <div className={`absolute inset-0 border ${borderStyle}  z-10 border-red-300/70`} />
               </BorderSpotlight>
               {/* Children */}
               <div className="relative z-20 w-full h-full">
                    {children}
               </div>
          </motion.div>
     );
};


export default CornerBorderSpotlight;