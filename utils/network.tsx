import { Code, Shield, Smartphone, Users, Zap } from "lucide-react";

export const networks = [
    {
        name: "Mainnet",
        status: "Production Ready",
        color: "bg-green-500",
        icon: <Shield className="h-6 w-6 text-green-500" />,
    },
    {
        name: "Devnet",
        status: "Development",
        color: "bg-blue-500",
        icon: <Code className="h-6 w-6 text-blue-500" />,
    },
    {
        name: "Testnet",
        status: "Testing",
        color: "bg-yellow-500",
        icon: <Zap className="h-6 w-6 text-yellow-500" />,
    },
]

export const whyChoose = [
      { icon: Shield, text: "Secure wallet connections with industry standards", color: "text-green-500" },
      { icon: Smartphone, text: "User-friendly interface designed for everyone", color: "text-blue-500" },
      { icon: Zap, text: "Lightning-fast transactions with low fees", color: "text-yellow-500" },
      { icon: Users, text: "Active community and comprehensive support", color: "text-purple-500" },
]