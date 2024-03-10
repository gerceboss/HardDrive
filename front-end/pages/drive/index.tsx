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
  const [folders, setFolders] = useState<string[] | null>([]);
  const [folderName, setFolderName] = useState("");
  const account_addr = useAccount().address;

  const createFolder = async () => {
    const status = await createNewFolder(account_addr, folderName, "");
    const newFolders = await getAllFolders(account_addr);
    setShowForm(!showForm);
    setFolders(newFolders);
  };

  useEffect(() => {
    const getfolders = async () => {
      const folders__ = await getAllFolders(account_addr);
      setFolders(folders__);
    };
    getfolders();
  }, []);

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
          <div>
            <label>
              Folder Name:
              <input
                type="text"
                onChange={(e) => setFolderName(e.target.value)}
              />
            </label>
            <button onClick={createFolder}>submit</button>
          </div>
        ) : null}
      </div>

      <Stack direction={"column"} spacing={10}>
        {(folders !== null) ? folders.map((folder, i) => (
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
        )): null}
      </Stack>
    </>
  );
};

export default DrivePage;
