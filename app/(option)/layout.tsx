"use client"
import CornerBorderSpotlight from "@/components/ui/CornerBorderSpotlight"
import { GridSmallBackground } from "@/components/ui/GridSmallBackground"
import HeroButton from "@/components/ui/HeroButton";
import { CONNECT_LABELS } from "@/utils/labest";
import { useWallet } from "@solana/wallet-adapter-react";
import { BaseWalletMultiButton } from "@solana/wallet-adapter-react-ui";

function Layout({ children }: { children: React.ReactNode }) {
  const wallet = useWallet();

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] top-20 relative w-full mb-16">
        <CornerBorderSpotlight className="px-2 sm:px-11 py-13 sm:py-15 z-40">
          { wallet.publicKey && wallet.connected ? children
          : <div className="flex flex-col items-center justify-center gap-4">
              <BaseWalletMultiButton labels={CONNECT_LABELS} style={{ background: 'transparent', padding:0, height:'fit-content', alignItems: 'center' }}>
                <HeroButton extraClass={"py-2.5 px-5 text-sm"} text={wallet.connected && wallet.publicKey ? wallet.publicKey.toBase58().slice(0,3)+".."+ wallet.publicKey.toBase58().slice(-3)
                  : 'Connect Wallet' }/>
              </BaseWalletMultiButton> 
              Please connect your wallet to use the faucet.
            </div>
          }
        </CornerBorderSpotlight>
        <GridSmallBackground />
    </div>
  )
}

export default Layout