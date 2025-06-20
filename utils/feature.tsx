import {
     Coins,
     Zap,
     FileSignature,
     Send,
     Wallet,
     Code,
} from "lucide-react";


interface featureType {
     icon: React.ReactNode;
     title: string;
     description: string;
}

export const features: featureType[] = [
     {
          icon: <Coins className="h-8 w-8 text-indigo-500" />,
          title: "Create Token",
          description:
               "Launch your own SPL tokens on Solana with just a few clicks. Full metadata support and instant deployment.",
     },
     {
          icon: <Zap className="h-8 w-8 text-yellow-500" />,
          title: "Mint Token",
          description:
               "Mint additional tokens to any wallet address. Perfect for rewards, airdrops, and token distribution.",
     },
     {
          icon: <FileSignature className="h-8 w-8 text-green-500" />,
          title: "Sign Messages",
          description:
               "Secure message signing for authentication and verification. Prove wallet ownership without transactions.",
     },
     {
          icon: <Send className="h-8 w-8 text-blue-500" />,
          title: "Send SOL",
          description:
               "Transfer SOL tokens instantly with low fees. Support for bulk transfers and scheduled payments.",
     },
     {
          icon: <Wallet className="h-8 w-8 text-purple-500" />,
          title: "Airdrop SOL",
          description:
               "Get test SOL for development on devnet and testnet. Perfect for testing your applications.",
          },
     {
          icon: <Code className="h-8 w-8 text-pink-500" />,
          title: "Developer Tools",
          description:
               "Complete development environment with devnet, testnet support and comprehensive debugging tools.",
     },
];
