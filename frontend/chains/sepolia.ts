import { Chain } from 'wagmi';

export const sepolia = {
  id: 11155111,
  name: 'Sepolia',
  network: 'sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Sepolia',
    symbol: 'AVAX',
  },
  rpcUrls: {
    public: { http: ['https://rpc2.sepolia.org'] },
    default: { http: ['https://rpc2.sepolia.org'] },
  },
  blockExplorers: {
    etherscan: { name: 'Sepolia', url: 'https://sepolia.etherscan.io/' },
    default: { name: 'Sepolia', url: 'https://sepolia.etherscan.io/' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain;
