"use client"
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { createContext, useContext, useMemo, useState } from 'react';

type NetworkType = 'testnet' | 'devnet' | 'mainnet';

interface SolanaNetworkContextType {
    network: NetworkType;
    setNetwork: (net: NetworkType) => void;
    toggleNetwork: () => void;
}

const SolanaNetworkContext = createContext<SolanaNetworkContextType | undefined>(undefined);

export const useSolanaNetwork = () => {
    const context = useContext(SolanaNetworkContext);
    if (!context) throw new Error("useSolanaNetwork must be used within WalletContextProvider");
    return context;
};


function WalletContexProvide({ children }: { children: React.ReactNode }) {
    const [network, setNetwork] = useState<NetworkType>('devnet');

    const rpcEndpoint = useMemo(() => {
        switch (network) {
            case 'devnet':
                return 'https://api.devnet.solana.com';
            default:
                return 'https://api.testnet.solana.com';
        }
    }, [network]);

    const toggleNetwork = () => {
        setNetwork(prev => prev === 'testnet' ? 'devnet' : 'testnet');
    };
        
    return (
        <SolanaNetworkContext.Provider value={{ network, setNetwork, toggleNetwork }}>
            <ConnectionProvider endpoint={rpcEndpoint}>
                    <WalletProvider wallets={[]} autoConnect>
                        <WalletModalProvider>
                        {children}
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </SolanaNetworkContext.Provider>   
    )
}

export default WalletContexProvide