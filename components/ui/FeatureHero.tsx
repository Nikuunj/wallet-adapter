import { SpotlightText } from "./SpotlightText"

function FeatureHero({ icon, title, describe }: { icon: React.ReactNode, title: string, describe: string}) {
     return (
          <div className="flex flex-col max-w-72 md:max-w-96 text-start  justify-start  items-start space-y-4">
               <div className={"font-bold text-2xl flex items-center justify-start gap-3"}>
                    <span>
                         {icon} 
                    </span>
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

export default FeatureHero