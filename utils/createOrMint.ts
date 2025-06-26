import { createAssociatedTokenAccountInstruction, createInitializeInstruction, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, createMintToInstruction, ExtensionType, getAssociatedTokenAddressSync, getMintLen, LENGTH_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE } from "@solana/spl-token";
import { pack } from "@solana/spl-token-metadata";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import axios from "axios";
import toast from "react-hot-toast";

interface MintInput {
     amount: string | undefined;
     tokenAddress: PublicKey | undefined;
     connection: Connection;
     wallet: WalletContextState;
}

interface CreateTokenInput {
     tokenName: string | undefined;
     tokenSymbol: string | undefined;
     tokenImageUrl: string | undefined;
     description: string | undefined;
     wallet: WalletContextState;
     connection: Connection;
}

export async function mintToken({ amount, tokenAddress, connection, wallet }: MintInput){
     const mintAmout = amount

     if(!mintAmout) { 
          console.error("Enter mint amout");
          toast.error('Enter Minting Amout');
          return;
     }
     if (!wallet.connected || !wallet.publicKey || !tokenAddress) {
          console.error("Token not minted / Wallet is not connected");
          return;
     }

     const ata = getAssociatedTokenAddressSync(
          tokenAddress,
          wallet.publicKey,
          false,
          TOKEN_2022_PROGRAM_ID,
     );
     const transaction2 = new Transaction().add(
          createAssociatedTokenAccountInstruction(
               wallet.publicKey,
               ata,
               wallet.publicKey,
               tokenAddress,
               TOKEN_2022_PROGRAM_ID,
          ),
     );
     
     await wallet.sendTransaction(transaction2, connection);

     const transaction3 = new Transaction().add(
          createMintToInstruction(tokenAddress, 
               ata, 
               wallet.publicKey, 
               parseInt(mintAmout) * LAMPORTS_PER_SOL, 
               [], 
               TOKEN_2022_PROGRAM_ID)
     );

     await wallet.sendTransaction(transaction3, connection);     
     return;
}



export async function createToken({ tokenName, tokenSymbol, tokenImageUrl, description, wallet, connection }: CreateTokenInput) {
     if (!tokenName || !tokenSymbol || !tokenImageUrl || !description) {
          console.error("Please fill in all fields");
          toast.error("Please fill in all fields.");
          return;
     }

     if(!wallet.connected || !wallet.publicKey) {
          console.error('wallet is not connected')
          toast.error('wallet publickey is not found');
          return;
     }

     const mintkeyPair = Keypair.generate();
     const res = await axios.post('/api/store-uri-data' ,  {
          name: tokenName,
          symbol: tokenSymbol,
          image: tokenImageUrl,
          description: description,
     });

     const uri = await res.data.url;

     const metadata = {
          mint: mintkeyPair.publicKey,
          name: tokenName,
          symbol: tokenSymbol,
          uri: uri,
          additionalMetadata: [],
     };


     const mintLen = getMintLen([ExtensionType.MetadataPointer]);
     const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
     const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);
     const transaction = new Transaction();
     transaction.add(
          SystemProgram.createAccount ({
               fromPubkey: wallet.publicKey,
               newAccountPubkey: mintkeyPair.publicKey,
               space: mintLen,
               lamports,
               programId: TOKEN_2022_PROGRAM_ID,
          }),
          createInitializeMetadataPointerInstruction(
               mintkeyPair.publicKey, 
               wallet.publicKey, 
               mintkeyPair.publicKey, 
               TOKEN_2022_PROGRAM_ID
          ),
          createInitializeMintInstruction(
               mintkeyPair.publicKey, 
               9, 
               wallet.publicKey, 
               null, 
               TOKEN_2022_PROGRAM_ID
          ),
          createInitializeInstruction({
               programId: TOKEN_2022_PROGRAM_ID,
               mint: mintkeyPair.publicKey,
               metadata: mintkeyPair.publicKey,
               name: metadata.name,
               symbol: metadata.symbol,
               uri: metadata.uri,
               mintAuthority: wallet.publicKey,
               updateAuthority: wallet.publicKey,
          }),
     );
     transaction.feePayer = wallet.publicKey;
     const recentBlock = await connection.getLatestBlockhash();
     transaction.recentBlockhash = recentBlock.blockhash;
     transaction.partialSign(mintkeyPair);
     const sign = await wallet.sendTransaction(transaction, connection);
     console.log("Transaction signature:", sign);
     console.log(mintkeyPair.publicKey.toBase58());
     return { pubkey: mintkeyPair.publicKey };
}