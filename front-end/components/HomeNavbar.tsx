import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Flex, Link } from "@chakra-ui/react";
import LinkNext from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { Title } from "./Title";

// Define the menu items
const MENU = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Drive",
    href: "/drive",
  },
];

// Desktop navigation component
const DesktopNav = () => {
  const router = useRouter();

  return (
    <Flex alignItems="center">
      {/* Render each menu item */}
      {MENU.map((navItem, i) => (
        <Link
          key={i}
          as={LinkNext}
          href={navItem.href}
          className={`menu-item ${router.pathname === navItem.href ? "active" : ""}`}
          color="gray.600"
          fontWeight={500}
          _hover={{ color: "gray.800" }}
          px={2}
          py={1}
          borderRadius="md"
          mr={4} // Add right margin for spacing
        >
          {navItem.label}
        </Link>
      ))}
    </Flex>
  );
};

// HomeNavbar component
export const HomeNavbar = () => {
  return (
    <div>
      {/* Title */}
      <Title />

      {/* Connect Button */}
      <ConnectButton />

      {/* Desktop Navigation */}
      <DesktopNav />
    </div>
  );
};