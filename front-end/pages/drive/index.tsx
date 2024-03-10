import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Navbar } from "../../components/Navbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { getAllFolders, createNewFolder } from "../../services/folder";
import { draftMode } from "next/headers";
import { useState, useEffect } from "react";
import { Stack, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import LinkNext from "next/link";

interface Menu {
  label: string;
  href: string;
}

const MENU: Menu[] = [];

const DrivePage = () => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [folders, setFolders] = useState<string[]>([]);
  const [folderName, setFolderName] = useState("");
  const account_addr = useAccount().address;
  const getFolders = async () => {
    const folders_ = await getAllFolders(account_addr);
    setFolders(folders_);
  };
  const createFolder = async () => {
    const status = await createNewFolder(account_addr, folderName, "");
    const newFolders = folders;
    newFolders.push(folderName);
    setFolders(newFolders);
  };

  return (
    <>
      <Navbar />
      <div>
        <button
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          Create Folder
        </button>
        {showForm ? (
          <form onSubmit={createFolder}>
            <label>
              Folder Name:
              <input
                type="text"
                onChange={(e) => setFolderName(e.target.value)}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        ) : null}
      </div>
      <div>
        <button onClick={getFolders}>show Folder</button>
      </div>
      <Stack direction={"column"} spacing={10}>
        {folders.map((folder, i) => (
          <Link
            key={i}
            as={LinkNext}
            href={`/drive/${folder}`}
            fontWeight={
              router.pathname === `/drive/${folder}` ? "bold" : "normal"
            }
          >
            {folder}
          </Link>
        ))}
      </Stack>
    </>
  );
};

export default DrivePage;
