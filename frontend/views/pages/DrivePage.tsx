import { GetServerSidePropsContext, GetServerSideProps } from "next";
import { AppHeader } from "@/components/common/AppHeader";
import { Section } from "@/components/common/Section";
import { Navbar } from "@/components/common/Navbar";
import { IFile } from "@/interfaces/file";
import { IFolder } from "@/interfaces/folder";
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
import { Address } from "viem";
import { getAllFolders } from "@/services/folder";

interface IFolderPageProps {
  folders: IFolder[] | null;
}

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  const { address } = context.params as { address: Address };
  const folders =await getAllFolders(address);
  return {
    props: {
      folders,
    },
  };
}) satisfies GetServerSideProps<IFolderPageProps>;

export const DrivePage = () => {
  return (
    <>
      <AppHeader title="drive" />
      <Navbar />
    </>
  );
};
