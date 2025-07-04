"use client"

import { tokenData } from "@/utils/tokenData";
import { useState } from "react"

export interface TokenTypes {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string;
  tags: string[];
  extensions?: Record<string, string>;
}

function SwapToken() {
     const [inputToken, setInputToken] = useState<string>("So11111111111111111111111111111111111111111")
     const [outputToken, setOutputToken] = useState<string>("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")


     return (
          <div className="flex flex-col gap-5">


               <div className="flex flex-col items-end bg-red-600">
                    <div className="bg-gray-500 ">

                         <select
                         onChange={(e) => { 
                              setInputToken(e.target.value)
                         }}
                         
                         value={inputToken}>
                              {tokenData.map((token, idx) => (
                                   <option key={token.address + idx} value={token.address}>{token.symbol}</option>
                              ))}
                         </select>
                    </div>
                    <div className="bg-emerald-500 relative right-0">
                         <input type="number" className="bg-emerald-500" placeholder="kdsjkdjk" />
                    </div>
               </div>
               <div className="flex flex-col items-end bg-red-600"> 
                    <div className="bg-gray-500 ">
                         <select
                         onChange={(e) => { 
                              setOutputToken(e.target.value)
                         }}
                         value={outputToken}>
                              {tokenData.map((token, idx) => (
                                   <option key={token.address + idx} value={token.address}>{token.symbol}</option>
                              ))}
                         </select>                    
                    </div>
                    <div className="bg-emerald-500 relative right-0">
                         <input type="number" className="bg-emerald-500" placeholder="kdsjkdjk" />
                    </div>
               </div>
     
          </div>
     )
}

export default SwapToken