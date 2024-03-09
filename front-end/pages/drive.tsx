import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Navbar } from "../components/Navbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { getAllFolders, createNewFolder } from "../services/folder";
import { draftMode } from "next/headers";
import { useState, useEffect } from "react";
import { IFolder } from "../interfaces/folder";

const DrivePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [folders, setFolders] = useState<string[]>([]);
  const [folderName, setFolderName] = useState("");
  const account_addr = useAccount().address;
  console.log(account_addr);
  const getFolders = async () => {
    const folders_ = await getAllFolders(account_addr);
    setFolders(folders_.name);
    console.log(folders);
  };
  const createFolder = async () => {
    console.log("folder creation initiated");
    const status = await createNewFolder(account_addr, folderName, "");
    console.log(status);
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
      <ul>
        {folders.map((folder) => (
          <li>{folder}</li>
        ))}
      </ul>
    </>
  );
};

export default DrivePage;
