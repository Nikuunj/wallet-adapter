"use client"

import { tokenData } from "@/utils/tokenData";
import { ArrowUpDown, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { motion, useAnimation } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import Button from "@/components/Button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { swapFunction } from "@/utils/swapFunction";

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
     const [outputToken, setOutputToken] = useState<string>("6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN");
     const [inputPriceUsd, setInputPriceUsd] = useState<string>('0.00');
     const [outputPriceUsd, setOutputPriceUsd] = useState<string>('0.00');
     const [inputAmount, setInputAmout] = useState<string>('')
     const [outputAmount, setOutnputAmout] = useState<string>('')
     const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
     const [quoteResponse, setquoteResponse] = useState<unknown>(null);

     const wallet = useWallet();
     const { connection } = useConnection();


     const controls = useAnimation();
     const isRotatedRef = useRef(false);

     const handleClick = async () => {
          isRotatedRef.current = !isRotatedRef.current;
          await controls.start({
               rotate: isRotatedRef.current ? 180 : 0,
               transition: { duration: 0.2, ease: "easeInOut", type: "tween" },
          });
          setInputToken(outputToken)
          setOutputToken(inputToken);
          setInputAmout(outputAmount)
          setOutnputAmout(inputAmount)
     };

     function handleCopy(textCopy: string) {
          navigator.clipboard.writeText(textCopy);
          toast.success("Copied to clipboard");
     }

     const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, token: string): string | void=> {
          const selectedToken = tokenData.find(t => t.address === token);
          const decimals = selectedToken?.decimals || 9;
          let value = e.target.value;

          if (!/^\d*\.?\d*$/.test(value)) return;

          const [intPart, decPart] = value.split(".");
          if (decPart && decPart.length > decimals) {
               value = `${intPart}.${decPart.slice(0, decimals)}`;
          }

          return value;
     };
     const tokenOptions = tokenData.map(token => ({
          value: token.address,
          label: token.symbol,
     }));
     async function fetchAmonutValue(){
          if(Number(inputAmount) <= 0 ) { 
               setOutnputAmout('');
               setInputPriceUsd('0.00');
               setOutputPriceUsd('0.00');
               setquoteResponse(null);
               return;   
          }
          const selectedToken = tokenData.find(t => t.address === inputToken);
          const decimals = selectedToken?.decimals || 9;

          // Use BigInt-safe conversion
          const amountInBaseUnits = BigInt(
               Number(inputAmount || "0") * Math.pow(10, decimals)
          ).toString();

          const params = new URLSearchParams({
               inputMint: inputToken,
               outputMint: outputToken,
               amount: amountInBaseUnits,
               slippageBps: "50",
          });

          const response = await axios.get(`https://quote-api.jup.ag/v6/quote?${params}`);
          const data = response.data;
          console.log(data);
          setquoteResponse(data);

          const selectedOutToken = tokenData.find(t => t.address === outputToken);
          const decimalsOut = selectedOutToken?.decimals || 9;
          setOutnputAmout((data.outAmount / Math.pow(10, decimalsOut)).toString())
          setInputPriceUsd(Number(data.swapUsdValue).toFixed(2));
          setOutputPriceUsd(Number(data.swapUsdValue).toFixed(2));
     }
     useEffect(() => {
          const timer = setTimeout(fetchAmonutValue, 201);
          return () => clearTimeout(timer);
     }, [inputAmount, inputToken, outputToken]);

     useEffect(() => {
          if (intervalRef.current) {
               clearInterval(intervalRef.current);
          }

          if (Number(inputAmount) > 0) {
               intervalRef.current = setInterval(() => {
                    fetchAmonutValue();
               }, 3111);
          }

          return () => {
               if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
               }
          };
     }, [inputAmount]);

     return (
          <div className="flex flex-col gap-y-2">
               <div className="flex flex-col items-end bg-zinc-900 py-7 px-5 gap-y-3 rounded-lg w-fit">
                    <div className="flex font-semibold w-full justify-between items-center text-sm">
                         <div className="space-y-2">
                              <p>Selling</p>
                              <p onClick={() => handleCopy(inputToken)} className="cursor-pointer text-gray-400 text-xs flex items-center gap-x-2">{inputToken.slice(0, 3)}...{inputToken.slice(-3)} 
                                   <Copy className="w-3 h-3 cursor-copy" />
                              </p>
                         </div>
                         <div className="w-fit">
                              <Select
                                   value={tokenOptions.find(option => option.value === inputToken)}
                                   onChange={(selectedOption) => {
                                        if (selectedOption) setInputToken(selectedOption.value);
                                   }}
                                   options={tokenOptions.filter(option => option.value !== outputToken && option.value !== inputToken)}
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
                    <div className="relative w-full text-end">
                         <input
                              type="number"
                              placeholder="0.00"
                              onChange={(e) => { 
                                   const val = handleAmountChange(e, inputToken);
                                   if (val !== undefined) {
                                        setInputAmout(val);
                                   }
                              }}
                              value={inputAmount}
                              className="w-full bg-transparent outline-none text-3xl text-end font-bold text-white placeholder-gray-600"
                         />
                         <p className="text-[13px] font-semibold text-gray-300/95">${inputPriceUsd}</p>
                    </div>
               </div>

               <div className="flex justify-center items-center">
                     <motion.span
                         animate={controls}
                         onClick={handleClick}
                         className="bg-zinc-900 border-black border-4 p-3 absolute rounded-full cursor-pointer"
                    >
                         <ArrowUpDown className="w-4 h-4" />
                    </motion.span>
               </div>

               <div className="flex flex-col items-end bg-zinc-900 py-7 px-5 gap-y-3 rounded-lg">
                    <div className="flex font-semibold w-full justify-between items-center text-sm">
                         <div className="space-y-2">
                              <p>Buying</p>
                              <p onClick={() => handleCopy(outputToken)} className="cursor-pointer text-gray-400 text-xs flex items-center gap-x-2">{outputToken.slice(0, 3)}...{outputToken.slice(-3)} 
                                   <Copy className="w-3 h-3 cursor-copy" />
                              </p>
                         </div>
                         <div className="w-fit">
                              <Select
                                   value={tokenOptions.find(option => option.value === outputToken)}
                                   onChange={(selectedOption) => {
                                        if (selectedOption) setOutputToken(selectedOption.value);
                                   }}
                                   options={tokenOptions.filter(option => option.value !== outputToken && option.value !== inputToken)}
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
                    <div className="relative w-full text-end">
                         <input
                              type="number"
                              placeholder="0.00"
                              // onChange={(e) => { 
                              //      const val = handleAmountChange(e, outputToken);
                              //      if (val !== undefined) {
                              //           setOutnputAmout(val);
                              //      }
                              // }}
                              value={outputAmount}
                              className="w-full bg-transparent outline-none text-3xl text-end font-bold text-white placeholder-gray-600"
                         />
                         <p className="text-[13px] font-semibold text-gray-300/95">~ ${outputPriceUsd}</p>
                    </div>
               </div>

               <Button handleClick={() =>swapFunction({ wallet, connection, quoteResponse })} text={'Swap'}/>
          </div>
     );
}

export default SwapToken;
