import {
  Text,
  Heading,
  Stack,
  SimpleGrid,
  Button,
  Wrap,
  Image,
  chakra,
  HStack,
  Divider,
  background,
} from "@chakra-ui/react";
import { AppHeader } from "@/components/common/AppHeader";
import { Section } from "@/components/common/Section";
import _ from "lodash";
import { DESCRIPTION } from "@/constants/info";
import { AnimatePresence, color } from "framer-motion";
import { chains } from "@/constants/web3";
import Link from "next/link";
import { MainLogo } from "@/components/common/Mainlogo";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { SearchInput } from "@/components/common/SearchInput";
import { setCacheHeader } from "@/utils/header";
import { useState } from "react";
import React from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { AccountContext } from "../../context/context";
import { Address, Hex } from "viem";

interface IHomePageProps {}

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  // 4 hours
  setCacheHeader(context.res, 14400);

  const [] = await Promise.all([]);
  return {
    props: {},
  };
}) satisfies GetServerSideProps<IHomePageProps>;

export const HomePage = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<Address | null>(null);

  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: process.env.INFURA_ID,
          },
        },
      },
    });
    return web3Modal;
  }

  async function connect() {
    try {
      const web3Modal = await getWeb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const accounts = await provider.listAccounts();
      let tmp: Address = `0x${accounts[0]}`;
      setAccount(tmp);
      localStorage.setItem("isWalletConnected", "true");
    } catch (err) {
      console.log("error:", err);
    }
  }

  return (
    <>
      <AppHeader title="Home" />
      <div className="header">
        {!account && (
          <div className="accountInfo">
            <button className="buttonStyle" onClick={connect}>
              Connect
            </button>
          </div>
        )}
        {account && (
          <p className="accountInfo" color="#F8F9FA">
            {account}
          </p>
        )}
      </div>
      <div>
        <Link href={"/drive"}>
          <Button>open drive</Button>
        </Link>
      </div>
      <AccountContext.Provider value={account}>
        {children}
      </AccountContext.Provider>
    </>
  );
};
