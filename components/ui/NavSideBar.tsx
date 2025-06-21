
"use client"
import { navLink } from "@/utils/navLinks";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"

function NavSideBar({ isOpen, closeOpen }: { isOpen: boolean, closeOpen: Dispatch<SetStateAction<boolean>>}) {
     const route = useRouter();

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
          <div className={`fixed top-0 min-w-screen flex justify-aroun  ${ isOpen ? 'right-0' : '-right-[100vw] delay-150'}  transition-all duration-300  min-h-screen overflow-hidden`}>    
               <div className={`w-full ${isOpen ? 'bg-black/45 delay-300 duration-200' : 'bg-transparent duration-100'}  transition-all`} onClick={() => closeOpen(false)}>
               </div>
               <div className="backdrop-blur-sm bg-black/70  min-w-44 w-64 px-3 py-3 space-y-5 border-s border-zinc-800">
                    <div className="w-fit cursor-pointer drop-shadow-[0_0_6px_rgba(167,139,250,1)]" onClick={() => closeOpen(false)}>
                         <ChevronRight className="h-6.5 w-6.5 sm:w-7.5 sm:h-7.5 md:w-9 md:h-9"/>
                    </div>
                    <div className="space-y-3 flex flex-col ps-2 sm:ps-5 w-full">
                         {renderNavLink}
                    </div>
               </div>
          </div>
     )
}

export default NavSideBar