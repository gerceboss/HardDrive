import { createContext } from "react";
import { Address, Hex } from "viem";
import { ZERO_ADDRESS } from "@/constants/web3";

export const AccountContext = createContext<Address | null>(null);
