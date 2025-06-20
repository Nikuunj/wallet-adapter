import BorderCorners from "./BorderCorners";
import BorderSpotlight from "./BorderSpotlight";

interface Props {
     children: React.ReactNode;
     className?: string;
     borderStyle?: string
}

const CornerBorderSpotlight: React.FC<Props> = ({ children, borderStyle = " ", className = '' }) => {
     return (
          <div className={`relative ${className}`}>
               {/* Corner borders on top */}
               <BorderCorners />
               <BorderSpotlight>
                    {/* Box with dotted border under the corners */}
                    <div className={`absolute inset-0 border border-${borderStyle} border-red-300/70 z-10`} />
               </BorderSpotlight>
               {/* Children */}
               <div className="relative z-20 w-full h-full">
                    {children}
               </div>
          </div>
     );
};


export default CornerBorderSpotlight;