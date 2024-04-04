import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Navbar } from "../../components/Navbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { getAllFolders, createNewFolder } from "../../services/folder";
import { draftMode } from "next/headers";
import { useState, useEffect } from "react";
import { Stack, Link, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import LinkNext from "next/link";
import { useStorageUpload } from "@thirdweb-dev/react";
import { uploadFile, getAllFiles } from "../../services/file";
import { Sidebar } from "../../components/Sidebar";

interface Menu {
  label: string;
  href: string;
}

const MENU: Menu[] = [];

const DrivePage = () => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [showImgForm, setShowImgForm] = useState(false);
  const [folders, setFolders] = useState<string[] | null>([]);
  const [folderName, setFolderName] = useState("");
  const [file, setFile] = useState<any>();
  const [fileInfo, setfileInfo] = useState<any[] | null>([]);
  const account_addr = useAccount().address;

  const { mutateAsync: upload } = useStorageUpload();

  const uploadToIpfs = async () => {
    const uploadURL = await upload({
      data: [file],
      options: {
        uploadWithGatewayUrl: true,
        uploadWithoutDirectory: true,
      },
    });
    console.log(uploadURL);
    const resFile = await uploadFile(
      file.name,
      "this is a file",
      uploadURL[0],
      file.size,
      account_addr
    );
    console.log(resFile);
    const allfileInfo = await getAllFiles(account_addr);
    setfileInfo(allfileInfo);
    setShowImgForm(!showImgForm);
  };

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
    const getFiles = async () => {
      const files__ = await getAllFiles(account_addr);
      setfileInfo(files__);
    };
    getfolders();
    getFiles();
  }, []);

  const goToProfilePage = () => {
    router.push('/profile');
  };

  return (
    <>
      <Navbar />
      <div className="metamask">
        <ConnectButton />
      </div>
      <Button onClick={goToProfilePage}>Profile</Button>
      <div>
        <div className="createFolder">
          <button
            className="button-3"
            onClick={() => {
              setShowForm(!showForm);
            }}
          >
            Create Folder
          </button>
        </div>
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
      <Stack
        direction={"column"}
        spacing={10}
        position={"relative"}
        width={"80%"}
        float={"right"}
        borderRadius={"15px"}
      >
        {folders !== null
          ? folders.map((folder, i) => (
              <Link
                bgColor={"#949fd3"}
                borderRadius={"10px"}
                padding={"10px"}
                fontSize={"x-large"}
                key={i}
                as={LinkNext}
                href={`/drive/${folder}`}
                fontWeight={
                  router.pathname === `/drive/${folder}` ? "bold" : "normal"
                }
              >
                {folder}
              </Link>
            ))
          : null}
      </Stack>
      <div>
        <div className="upload">
          <button
            className="button-3"
            onClick={() => {
              setShowImgForm(!showImgForm);
            }}
          >
            Upload File
          </button>
        </div>
        {showImgForm ? (
          <div>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                }
              }}
            />
            <button onClick={uploadToIpfs}>upload</button>
          </div>
        ) : null}
      </div>
      <Stack direction={"column"} spacing={10}>
        {fileInfo !== null
          ? fileInfo.map((fileHash, i) => (
              <Link key={i} as={LinkNext} href={fileHash.ipfsHash}>
                {fileHash.name}
              </Link>
            ))
          : null}
      </Stack>
    </>
  );
};

export default DrivePage;
