"use client"
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

function WalletContexProvide({ children }: { children: React.ReactNode }) {

    
    const rpcEndPonit = "https://api.devnet.solana.com"
    
    return (
        <ConnectionProvider endpoint={rpcEndPonit}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                {children}
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>   
    )
}

export default WalletContexProvide