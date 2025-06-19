import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NavBar from "@/components/NavBar";
import WalletContexProvide from "@/components/WalletContexProvide";
import '@solana/wallet-adapter-react-ui/styles.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "X-AirDrop",
  description: `A Solana faucet is a platform that provides free testnet SOL tokens to developers for testing and developing applications on the Solana blockchain. These tokens are used in the Solana Devnet and Testnet networks, allowing developers to experiment with smart contracts, dApps, and other blockchain-based tools without using real SOL. 
    How to Use a Solana Faucet:
    1. Find a Faucet:
    There are several Solana faucets available, each with its own specific requirements and limitations. 
    2. Set Up a Wallet:
    You'll need to set up a Solana wallet, such as Phantom, and switch to the Devnet or Testnet. 
    3. Claim Test SOL:
    Once you've set up your wallet and switched to the correct network, you can claim test SOL from the faucet. 
    4. Test Your Applications:
    You can then use the test SOL to test your applications and smart contracts.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>
            {`@import url("https://fonts.googleapis.com/css2?family=Doto:wght@100..900&display=swap");`}
        </style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-gray-300 text-base overflow-x-hidden min-h-screen min-w-screen`}
      >
        <WalletContexProvide>
          {/* <NavBar /> */}
          {children}
          <Toaster />
        </WalletContexProvide>
      </body>
    </html>
  );
}
