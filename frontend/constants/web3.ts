import { configureChains, createConfig } from 'wagmi'
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { InjectedConnector } from "wagmi/connectors/injected";
import { createWeb3Modal } from "@web3modal/wagmi";
import { DESCRIPTION, TITLE } from "./info";
import theme from "@/themes";
import { publicProvider } from "wagmi/providers/public";
import {sepolia, polygonMumbai, bscTestnet } from "viem/chains";
import { Address, Hex } from "viem";

const metadata = {
  name: TITLE,
  description: DESCRIPTION,
  url: "",
  icons: [""],
};

export const chains = [
  { ...sepolia, icon: "/icons/ethereum.svg", color: "#756e6c" },
  { ...bscTestnet, icon: "/icons/arbitrum.svg", color: "#9dcced" },
  { ...polygonMumbai, icon: "/icons/optimism.svg", color: "#ff0420" },
];

export const getChain = (chainId?: number) => {
  return chainId ? chains.find((chain) => chain.id === chainId) : undefined;
};

const { publicClient } = configureChains(chains, [
  publicProvider(),
  publicProvider(),
  publicProvider(),
  publicProvider(),
  publicProvider(),
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "", //require projectid
        showQrModal: false,
        metadata,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        shimDisconnect: true,
      },
    }),
  ],
});

export const web3Modal = createWeb3Modal({
  defaultChain: chains[0],
  wagmiConfig,
  chains,
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "",
  themeMode: theme.config.initialColorMode,
  themeVariables: {
    "--w3m-font-family": theme.fonts.heading,
    "--w3m-accent": theme.colors.primary.accent,
  },
});

export const ZERO_ADDRESS: Address =
  "0x0000000000000000000000000000000000000000";

export const ZERO_BYTES32: Hex =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
