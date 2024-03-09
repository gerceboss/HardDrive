import { createContext } from "react";
import { Address, Hex } from "viem";

export const AccountContext = createContext<Address>("0x");
