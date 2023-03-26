import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { Chain, polygon } from 'wagmi/chains';
//import { polygon } from '@wagmi/core/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';

import { Layout } from '@/components';
import { DiamondContextProvider } from '@/contexts';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';


const mantleChain: Chain = {
  id: 5001,
  name: 'Mantle',
  network: 'mantle',
  iconUrl: 'https://example.com/icon.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Mantle',
    symbol: 'MNTL',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.mantle.xyz/'],
    },
    public: {http: ['http://rpc.testnet.mantle.xyz/']}
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  testnet: true,
};    

// const { chains, provider, webSocketProvider } = configureChains(
//   [polygon, mantleChain],
//   [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! })],
// );

const { provider, chains, webSocketProvider } = configureChains(
  [polygon, mantleChain],
  [
    jsonRpcProvider({
      rpc: chain => ({ http: 'https://rpc.testnet.mantle.xyz/' }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Diamond blueprinter',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/chainhackers/diamond-blueprinter',
  cache,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <DiamondContextProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitProvider>
        </WagmiConfig>
      </DiamondContextProvider>
    </ApolloProvider>
  );
}
