import '@rainbow-me/rainbowkit/styles.css'; // Import RainbowKit styles
import {
  connectorsForWallets,
  RainbowKitProvider,
  wallet,
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

// Configure the supported chains
const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [publicProvider()]
);

// Define wallet connectors
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      wallet.metaMask({ chains }),
      wallet.walletConnect({ chains }),
      wallet.coinbase({ chains, appName: 'EqualFi App' }),
    ],
  },
]);

// Create a Wagmi client
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

// Wrap RainbowKitProvider and WagmiConfig together
export const AppProviders = ({ children }) => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
  </WagmiConfig>
);
