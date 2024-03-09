import { ConnectButton } from "@rainbow-me/rainbowkit";

import styles from "../styles/Home.module.css";

import { Stack, Link } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import LinkNext from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { Title } from "./Title";

interface Menu {
  label: string;
  href: string;
}

const MENU: Menu[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Drive",
    href: "/drive",
  },
];

export const Navbar = () => {
  return (
    <>
      <Title />
      <DesktopNav />
      <ConnectButton />
    </>
  );
};

const DesktopNav = () => {
  const router = useRouter();

  return (
    <>
      <Stack direction={"row"} spacing={10}>
        {MENU.map((navItem, i) => (
          <Link
            key={i}
            as={LinkNext}
            href={navItem.href}
            fontWeight={router.pathname === navItem.href ? "bold" : "normal"}
          >
            {navItem.label}
          </Link>
        ))}
      </Stack>
    </>
  );
};
