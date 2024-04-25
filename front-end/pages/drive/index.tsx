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
import { giveAccess } from "../../services/file";
import { FilePopup } from "../../components/FilePopup";
import { FolderPopup } from "../../components/FolderPopup";
import { redirect } from "next/navigation";

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
  const [displayFolders, setdisplayFolders] = useState(true);
  const [displayFiles, setdisplayFiles] = useState(true);

  const [selectedFile, setSelectedFile] = useState(null);
  const [showAccessOption, setShowAccessOption] = useState(false);
  const [showAccessForm, setShowAccessForm] = useState(false);
  const [accessAddress, setAccessAddress] = useState("");

  const { mutateAsync: upload } = useStorageUpload();

  const uploadToIpfs = async () => {
    const message = "encyption-key-";
    const from = account_addr;
    const msg = `0x${Buffer.from(message, "utf8").toString("hex")}`;
    const sign = await window.ethereum.request({
      method: "personal_sign",
      params: [msg, from],
    });
    const key = sign.toString();
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

  const handleMouseEnter = (file: any) => {
    setSelectedFile(file);
    setShowAccessOption(true);
  };

  const handleMouseLeave = () => {
    setSelectedFile(null);
    setShowAccessOption(false);
  };

  const handleGiveAccess = async () => {
    try {
      await giveAccess(selectedFile, accessAddress, account_addr);
      setSelectedFile(null);
      setShowAccessForm(false);
      setAccessAddress("");
      alert("access given successfully!");
    } catch (error) {
      alert("Failed to give access.");
      console.error("error granting access =", error);
    }
  };

  const handleAccessOptionClick = () => {
    setShowAccessForm(true);
  };

  const handleFileAccess = async (file_hash: string) => {
    const message = "encyption-key-";
    const from = account_addr;
    const msg = `0x${Buffer.from(message, "utf8").toString("hex")}`;
    const sign = await window.ethereum.request({
      method: "personal_sign",
      params: [msg, from],
    });
    const key = sign.toString();
    console.log(file_hash);
    router.push(file_hash);
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
    router.push("/profile");
  };

  return (
    <>
      <Sidebar
        setdisplayFiles={setdisplayFiles}
        setdisplayFolders={setdisplayFolders}
      />
      <div className="NotSidebar">
        <Navbar />
        <div className="metamask">
          <ConnectButton />
        </div>

        <div>
          <button className="profileButton1" onClick={goToProfilePage}></button>
        </div>
        <div>
          <div className="createFolder">
            <button className="button-3" onClick={() => setShowForm(!showForm)}>
              Create Folder
            </button>
          </div>
          {showForm ? (
            <FolderPopup
              setFolderName={setFolderName}
              createFolder={createFolder}
              folderName={folderName}
              setShowForm={setShowForm}
            />
          ) : null}
        </div>
        <div>
          <div className="upload">
            <button
              className="button-3"
              onClick={() => setShowImgForm(!showImgForm)}
            >
              Upload File
            </button>
          </div>
          {displayFolders ? (
            <div className="folderContainer">
              {folders !== null &&
                folders.map((folder, i) => (
                  <Link key={i} as={LinkNext} href={`/drive/${folder}`}>
                    <div className="folders">
                      {" "}
                      <img
                        src="folder.png"
                        alt="Folder Icon"
                        className="folderIcon"
                      />
                      {folder}
                    </div>
                  </Link>
                ))}
            </div>
          ) : null}
          {showImgForm ? (
            <FilePopup
              setFile={setFile}
              uploadToIpfs={uploadToIpfs}
              setShowImgForm={setShowImgForm}
            />
          ) : null}
        </div>
        {displayFiles ? (
          <div className="folderContainer">
            {fileInfo !== null &&
              fileInfo.map((fileHash, i) => (
                <button
                  className="link"
                  onClick={() => handleFileAccess(fileHash.ipfsHash)}
                >
                  <div
                    onMouseEnter={() => handleMouseEnter(fileHash)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="folders">
                      <img
                        src="/file.png"
                        alt="Folder Icon"
                        className="folderIcon"
                      />
                      {fileHash.name}
                      {showAccessOption && selectedFile === fileHash && (
                        <button
                          className="button-1"
                          onClick={handleAccessOptionClick}
                        >
                          Give Access
                        </button>
                      )}
                    </div>
                  </div>
                </button>
              ))}
          </div>
        ) : null}
        {showAccessForm && (
          <div className="accessForm">
            <input
              type="text"
              placeholder="Enter address to give access"
              value={accessAddress}
              onChange={(e) => setAccessAddress(e.target.value)}
            />
            <button onClick={handleGiveAccess}>Submit</button>
          </div>
        )}
      </div>
    </>
  );
};

export default DrivePage;
