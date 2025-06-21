import { Coins, FileSignature, Send, Wallet, Zap } from "lucide-react";

interface navLinkType {
     title: string;
     Icon: React.ReactNode;
     to: string;
     color: string;
}

export const navLink: navLinkType[] = [
     {
          title: "Create Token",
          Icon: <Coins className="h-5 w-5 text-indigo-500" />,
          to: '/createToken',
          color: 'text-indigo-500'
     },
     {
          title: "Send SOL",
          Icon: <Send className="h-5 w-5 text-blue-500" />,
          to: '/sendsol',
          color: 'text-blue-500'
     },
     {
          title: "Mint Token",
          Icon: <Zap className="h-5 w-5 text-yellow-500" />,
          to: '/createToken',
          color: 'text-yellow-500'
     },
     {
          title: "Sign Messages",
          Icon: <FileSignature className="h-5 w-5 text-green-500" />,
          to: '/signmsg',
          color: 'text-green-500'
     },     
     {
          title: "Airdrop SOL",
          Icon: <Wallet className="h-5 w-5 text-purple-500" />,
          to: '/airdrop',
          color: 'text-purple-500'
     }
]