# X-AirDrop - Solana Wallet Adapter

A modern Solana wallet adapter application built with Next.js that enables seamless wallet connectivity and network switching for Solana-based applications.

## 🌟 Features

### 🔗 Wallet Integration
- **Multi-Wallet Support**: Connect with popular Solana wallets (Phantom, Solflare, Backpack, etc.)
- **Network Switching**: Easy toggle between Devnet, Testnet, and Mainnet
- **Real-time Connection**: Instant wallet connection status updates
- **Secure Integration**: Built-in security best practices for wallet interactions

### 🪙 Token Operations
- **Create Token**: Generate new SPL tokens with custom metadata
- **Mint Tokens**: Mint additional supply to existing tokens
- **Token Management**: View and manage your created tokens

### 💸 Transaction Features
- **Send SOL**: Transfer SOL between wallets with custom amounts
- **Sign Messages**: Cryptographically sign custom messages
- **Transaction History**: View recent transaction activity

### 🎁 Utility Features
- **Airdrop Wallet**: Request SOL airdrops on Devnet/Testnet for development
- **Balance Checker**: Real-time SOL and token balance display
- **Modern UI**: Clean and responsive interface built with Next.js

## 🚀 Live Demo

Check out the live application: [https://wallet-adapter-wine.vercel.app/](https://wallet-adapter-wine.vercel.app/)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Blockchain**: Solana Web3.js
- **Wallet Integration**: Solana Wallet Adapter
- **Token Standard**: SPL Token Program
- **Styling**: Tailwind CSS / CSS Modules
- **Font**: Geist (Vercel's font family)
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nikuunj/wallet-adapter.git
   cd wallet-adapter
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🔧 Configuration

The application supports multiple Solana networks. You can switch between:
- **Devnet** (Development)
- **Testnet** (Testing)
- **Mainnet** (Production)

Network switching is available directly in the UI with a simple click.

## 💡 Usage

### 🔗 Wallet Connection
1. **Connect Wallet**: Click "Select Wallet" to choose your preferred Solana wallet
2. **Switch Networks**: Use the network selector to change between Devnet, Testnet, and Mainnet
3. **View Connection Status**: Monitor your wallet connection status in real-time

### 🪙 Token Operations
1. **Create Token**:
   - Navigate to the "Create Token" section
   - Enter token name, symbol, and decimals
   - Set initial supply and upload metadata
   - Click "Create Token" to deploy on Solana

2. **Mint Tokens**:
   - Select an existing token from your list
   - Enter the amount to mint
   - Specify recipient address (optional)
   - Confirm transaction to mint new tokens

### 💸 Transactions
1. **Send SOL**:
   - Click on "Send SOL" feature
   - Enter recipient's wallet address
   - Specify amount to send
   - Review and confirm transaction

2. **Sign Message**:
   - Navigate to "Sign Message" section
   - Enter custom message text
   - Click "Sign" to create cryptographic signature
   - Copy signed message for verification

### 🎁 Development Tools
1. **Airdrop SOL** (Devnet/Testnet only):
   - Ensure you're connected to Devnet or Testnet
   - Click "Request Airdrop"
   - Receive 1-2 SOL for testing purposes
   - Note: Mainnet airdrops are not available

## 🔨 Development


### Development Workflow

1. **Start Development Server**: The main application logic is in `app/page.tsx`
2. **Hot Reloading**: The page auto-updates as you edit files
3. **Component Testing**: Test individual features using the component interfaces
4. **Network Testing**: Switch between networks to test different environments

### Key Development Notes

- **Devnet/Testnet**: Use for development and testing
- **Mainnet**: Only use for production deployments
- **Airdrop Limits**: Devnet/Testnet airdrops are rate-limited
- **Transaction Fees**: All operations require SOL for transaction fees

## 🚀 Deployment

The easiest way to deploy this Next.js app is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy your application

For other deployment options, check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 📚 Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter) - Official Solana wallet adapter
- [Solana Web3.js](https://docs.solana.com/developing/clients/javascript-api) - Solana JavaScript API
- [SPL Token Program](https://spl.solana.com/token) - Solana Program Library for tokens
- [Solana Cookbook](https://solanacookbook.com/) - Comprehensive Solana development guide
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial

### 🔧 Environment Variables

Create a `.env` file in your root directory:

```env
API_Key=
API_Secret=
PINATA_JWT=
NEXT_PUBLIC_GATEWAY_UR=
```

### 📋 Prerequisites

- Node.js 18+ installed
- A Solana wallet (Phantom, Solflare, etc.)
- Basic understanding of blockchain concepts
- SOL tokens for transaction fees (get from faucet for testing)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Nikuunj**
- GitHub: [@Nikuunj](https://github.com/Nikuunj)

## 🙏 Acknowledgments

- [Solana Labs](https://solana.com/) for the wallet adapter library
- [Vercel](https://vercel.com/) for the deployment platform
- [Next.js](https://nextjs.org/) for the amazing React framework

---

⭐ If you found this project helpful, please give it a star on GitHub!
