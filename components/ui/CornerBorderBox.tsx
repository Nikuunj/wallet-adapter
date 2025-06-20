import BorderSpotlight from "./BorderSpotlight";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const CornerBorderBox: React.FC<Props> = ({ children, className = '' }) => {
     return (
          <div className={`relative ${className}`}>
               {/* Corner borders on top */}
                    <span className="corner top-left z-30"></span>
                    <span className="corner top-right z-30"></span>
                    <span className="corner bottom-left z-30"></span>
                    <span className="corner bottom-right z-30"></span>

               <BorderSpotlight>
                    {/* Box with dotted border under the corners */}
                    <div className="absolute inset-0 border border-dashed border-red-300/70 z-10" />
               </BorderSpotlight>
               {/* Children */}
               <div className="relative z-20 w-full h-full">
                    {children}
               </div>
          </div>
     );
};


export default CornerBorderBox;