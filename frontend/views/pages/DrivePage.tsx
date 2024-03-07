import { GetServerSidePropsContext, GetServerSideProps } from "next";
import { AppHeader } from "@/components/common/AppHeader";
import { Section } from "@/components/common/Section";
import { Navbar } from "@/components/common/Navbar";

import {
    Center,
    HStack,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    chakra,
  } from "@chakra-ui/react";

export const DrivePage = () => {
    return (
      <>
        <AppHeader
          title="test-string"
        />
        <Navbar/>
      </>
    );
  };