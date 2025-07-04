"use client"

import { tokenData } from "@/utils/tokenData";
import { ArrowUpDown } from "lucide-react";
import { useRef, useState } from "react";
import Select from "react-select";
import { motion, useAnimation } from "framer-motion";

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
     const [inputToken, setInputToken] = useState<string>("So11111111111111111111111111111111111111112");
     const [outputToken, setOutputToken] = useState<string>("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

     const controls = useAnimation();
     const isRotatedRef = useRef(false);

     const handleClick = async () => {
          isRotatedRef.current = !isRotatedRef.current;
          await controls.start({
               rotate: isRotatedRef.current ? 180 : 0,
               transition: { duration: 0.2, ease: "easeInOut", type: "tween" },
          });
     };
     
     const tokenOptions = tokenData.map(token => ({
          value: token.address,
          label: token.symbol,
     }));

     return (
          <div className="flex flex-col gap-y-2">
               <div className="flex flex-col items-end bg-zinc-900 py-7 px-5 gap-y-3 rounded-lg w-fit">
                    <div className="flex font-semibold w-full justify-between items-center text-sm">
                         <div>
                              <p>Selling</p>
                         </div>
                         <div className="w-fit">
                              <Select
                                   value={tokenOptions.find(option => option.value === inputToken)}
                                   onChange={(selectedOption) => {
                                        if (selectedOption) setInputToken(selectedOption.value);
                                   }}
                                   options={tokenOptions}
                                   classNames={{
                                        control: () => "bg-gray-800 rounded-full border-none px-2 py-0.5",
                                        menu: () => "bg-gray-800  no-scrollbar", 
                                        option: () => "hover:bg-zinc-700 cursor-pointer",
                                        menuList: () => "no-scrollbar",
                                   }}
                                   styles={{
                                        control: (base) => ({
                                             ...base,
                                             backgroundColor: "#1F2937",
                                             borderRadius: "9999px",
                                             border: "none",
                                             boxShadow: "none",
                                             minHeight: "auto",
                                        }),
                                        menu: (base) => ({
                                             ...base,
                                             backgroundColor: "#1F2937",
                                             zIndex: 20,
                                        }),
                                        menuList: (base) => ({
                                             ...base,
                                             scrollbarWidth: 'none',
                                             msOverflowStyle: 'none',
                                             '&::-webkit-scrollbar': {
                                                  display: 'none'
                                             }
                                        }),
                                        option: (base, { isFocused }) => ({
                                             ...base,
                                             backgroundColor: isFocused ? "#374151" : "#1F2937",
                                             color: "white",
                                        }),
                                        dropdownIndicator: (base) => ({
                                             ...base,
                                        }),
                                        singleValue: (base) => ({
                                             ...base,
                                             color: "#9f9fa9",
                                             fontWeight: "750",
                                        }),
                                        input: (base) => ({
                                             ...base,
                                             color: "#9f9fa9",
                                             fontWeight: "750",
                                        }),
                                        indicatorSeparator: () => ({ display: "none" }),
                                   }}
                                   isSearchable={true}
                              />
                         </div>
                    </div>
                    <div className="relative w-full">
                         <input
                              type="number"
                              placeholder="0.00"
                              className="w-full bg-transparent outline-none text-3xl text-end font-bold text-white placeholder-gray-400"
                         />
                    </div>
               </div>

               <div className="flex justify-center items-center">
                     <motion.span
                         animate={controls}
                         onClick={handleClick}
                         className="bg-zinc-900 border-zinc-800 border p-2 absolute rounded-full cursor-pointer"
                    >
                         <ArrowUpDown />
                    </motion.span>
               </div>

               <div className="flex flex-col items-end bg-zinc-900 py-7 px-5 gap-y-3 rounded-lg">
                    <div className="flex font-semibold w-full justify-between items-center text-sm">
                         <div>
                              <p>Buying</p>
                         </div>
                         <div className="w-fit">
                              <Select
                                   value={tokenOptions.find(option => option.value === outputToken)}
                                   onChange={(selectedOption) => {
                                        if (selectedOption) setOutputToken(selectedOption.value);
                                   }}
                                   options={tokenOptions}
                                   classNames={{
                                        control: () => "bg-gray-800 rounded-full border-none px-2 py-0.5",
                                        menu: () => "bg-gray-800  no-scrollbar", 
                                        option: () => "hover:bg-zinc-700 cursor-pointer",
                                        menuList: () => "no-scrollbar",
                                   }}
                                   styles={{
                                        control: (base) => ({
                                             ...base,
                                             backgroundColor: "#1F2937",
                                             borderRadius: "9999px",
                                             border: "none",
                                             boxShadow: "none",
                                             minHeight: "auto",
                                        }),
                                        menu: (base) => ({
                                             ...base,
                                             backgroundColor: "#1F2937",
                                             zIndex: 20,
                                        }),
                                        menuList: (base) => ({
                                             ...base,
                                             scrollbarWidth: 'none',
                                             msOverflowStyle: 'none',
                                             '&::-webkit-scrollbar': {
                                                  display: 'none'
                                             }
                                        }),
                                        option: (base, { isFocused }) => ({
                                             ...base,
                                             backgroundColor: isFocused ? "#374151" : "#1F2937",
                                             color: "white",
                                        }),
                                        dropdownIndicator: (base) => ({
                                             ...base,
                                        }),
                                        singleValue: (base) => ({
                                             ...base,
                                             color: "#9f9fa9",
                                             fontWeight: "750",
                                        }),
                                        input: (base) => ({
                                             ...base,
                                             color: "#9f9fa9",
                                             fontWeight: "750",
                                        }),
                                        indicatorSeparator: () => ({ display: "none" }),
                                   }}
                                   isSearchable={true}
                              />
                         </div>
                    </div>
                    <div className="relative w-full">
                         <input
                              type="number"
                              placeholder="0.00"
                              className="w-full bg-transparent outline-none text-3xl text-end font-bold text-white placeholder-gray-400"
                         />
                    </div>
               </div>
          </div>
     );
}

export default SwapToken;
