import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, VersionedTransaction } from "@solana/web3.js";
import axios from "axios";
import toast from "react-hot-toast";

interface swapTypes {
     connection: Connection;
     wallet: WalletContextState;
     quoteResponse: any; 
}

async function getSwapTransaction(quoteResponse: any, publicKey: string) {
     const response = await axios.post('https://quote-api.jup.ag/v6/swap', {
     quoteResponse,
     userPublicKey: publicKey,
     wrapAndUnwrapSol: true,
     // feeAccount: "fee_account_public_key", // optional
     }, {
          headers: {
               'Content-Type': 'application/json',
          }
     });

     const { swapTransaction } = response.data;
     return swapTransaction;
}

export async function swapFunction({ connection, wallet, quoteResponse }: swapTypes) {
     if (!wallet || !wallet.publicKey) {
          toast.error('Please connect your wallet');
          return;
     }

     if (!quoteResponse) {
          toast.error('Not valid input amount');
          return;
     }

     try {
          const swapTr = await getSwapTransaction(quoteResponse, wallet.publicKey.toString());

          if (!swapTr) {
               toast.error('Swap transaction is not available');
               return;
          }

          const swapTransactionBuf = Buffer.from(swapTr, 'base64');
          const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

          const { blockhash } = await connection.getLatestBlockhash();
          transaction.message.recentBlockhash = blockhash;

          const signature = await wallet.sendTransaction(transaction, connection);
          toast.success(`Transaction Complete`);

     } catch (error) {
          console.error('Swap transaction failed:', error);
          toast.error('Swap transaction failed');
     }
}
