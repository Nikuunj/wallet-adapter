import { navLink } from "@/utils/navLinks";
import { ChevronRight, Power } from "lucide-react";
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useState } from "react"
import { useSolanaNetwork } from "../WalletContexProvide";
import ToggleButton from "./ToggleButton";
import { AnimatePresence, motion } from "framer-motion";
import { BaseWalletDisconnectButton,  } from "@solana/wallet-adapter-react-ui";
import { DISSCONNECT_LABELS } from "@/utils/labest";

function NavSideBar({ isOpen, closeOpen }: { isOpen: boolean, closeOpen: Dispatch<SetStateAction<boolean>>}) {
     const route = useRouter();
     const [devToMain, setDevToMain] = useState<boolean>(false);
     const [devToTest, setDevToTest] = useState<boolean>(false);
     const { network, toggleNetwork } = useSolanaNetwork();

     function changeToggleMainToDevNetwork() {
          if(network === 'mainnet') {
               setDevToMain(true)
               if(devToTest) {
                    toggleNetwork('testnet')
               } else {
                    toggleNetwork('devnet')
               }
          } else {
               setDevToMain(false)
               toggleNetwork('mainnet')
          }
     }

     function toggleTestToDev() {
          if(devToTest) {
               toggleNetwork('devnet')
               setDevToTest(false)
          } else {
               toggleNetwork('testnet')
               setDevToTest(true)
          }
     }

     function handleRouting(str: string) {
          route.push(str)
          closeOpen(false)
     }

     const renderNavLink = navLink.map((link, idx) => (
          <div key={link.title + idx} className={`flex items-center gap-2 cursor-pointer capitalize`} onClick={() => handleRouting(link.to)}>
               <span className={`drop-shadow-[0_0_6px_rgba(167,139,250,1)] `}>
                    {link.Icon}
               </span>
               {link.title}
          </div>
     ))

     return (
          <div className={`fixed top-0 min-w-screen flex justify-aroun  ${ isOpen ? 'right-0' : '-right-[100vw] delay-150'}  transition-all duration-300  min-h-screen overflow-hidden z-50`}>    
               <div className={`w-full ${isOpen ? 'bg-black/45 delay-300 duration-200' : 'bg-transparent duration-100'}  transition-all`} onClick={() => closeOpen(false)}>
               </div>
               <div className="backdrop-blur-sm bg-black/70  min-w-44 w-64 px-3 py-3 space-y-5 border-s border-zinc-800">
                    <div className="flex  items-center justify-between pe-3">

                         <div className="w-fit cursor-pointer drop-shadow-[0_0_6px_rgba(167,139,250,1)]" onClick={() => closeOpen(false)}>
                              <ChevronRight className="h-6.5 w-6.5 sm:w-7.5 sm:h-7.5 md:w-9 md:h-9"/>
                         </div>
                         <div className="w-fit  cursor-pointer drop-shadow-[0_0_6px_rgba(167,139,250,1)]" onClick={() => closeOpen(false)}>
                              <BaseWalletDisconnectButton  labels={DISSCONNECT_LABELS} style={{ background: 'transparent', padding:0, height:'fit-content', alignItems: 'center' }}>
                                   <Power className="h-5 w-5 sm:w-5 sm:h-5 md:w-5 md:h-5 text-red-700" />
                              </BaseWalletDisconnectButton>
                         </div>
                    </div>
                    <div className="space-y-5 flex flex-col ps-2 sm:ps-5 w-full">
                         {renderNavLink}
                         <div className="flex gap-2 capitalize items-center">
                              <ToggleButton isOn={devToMain} toggleSwitch={changeToggleMainToDevNetwork} /> 
                              { !devToMain ? 'Production' : 'Development' }
                         </div>
                          <AnimatePresence initial={false}>
                              { devToMain && 

                                   <motion.div 
                                   initial={{ opacity: 0, scale: 0 }}
                                   animate={{ opacity: 1, scale: 1 }}
                                   exit={{ opacity: 0, scale: 0 }}
                                   key={"box"}
                                   transition={{
                                        duration: 0.4,
                                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                                   }}
                                   className="flex gap-2 capitalize items-center">
                                        <ToggleButton isOn={devToTest} toggleSwitch={toggleTestToDev} /> 
                                        {network}
                                   </motion.div>
                              }
                         </AnimatePresence>
                    </div>

               
               </div>
          </div>
     )
}

export default NavSideBar