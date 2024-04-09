import { ConnectButton } from "@rainbow-me/rainbowkit";

import styles from "../styles/Home.module.css";

import { Stack, Link, Button } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import LinkNext from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { Title } from "./Title";


export const Navbar = () => {
  return (
    <div className="Navbar">
      <DesktopNav />
    </div>
  );
};

const DesktopNav = () => {
  const router = useRouter();

  return (
    <>
      <Stack direction={"row"} spacing={10}>
        {/* */}
      </Stack>
    </>
  );
};