import { useRouter } from "next/router";
import { getFoldersByFolder, createNewFolder } from "../../services/folder";
import { getFilesByFolder,uploadFileInfolder } from "../../services/folder";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { Stack, Link } from "@chakra-ui/react";
import { uploadFile, getAllFiles } from "../../services/file";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import LinkNext from "next/link";
import { useStorageUpload } from "@thirdweb-dev/react";
import { FolderPopup } from "../../components/FolderPopup";
import { FilePopup } from "../../components/FilePopup";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const FolderPage = () => {
  const router = useRouter();
  const parentFolderName = router.query.folder;
  const account_addr = useAccount().address;
  const [folders, setFolders] = useState<string[] | null>([]);
  const [folderName, setFolderName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState<any>();
  const [displayFolders, setdisplayFolders] = useState(true);
  const [displayFiles, setdisplayFiles] = useState(true);
  const [fileInfo, setfileInfo] = useState<any[] | null>([]);
  const [showImgForm, setShowImgForm] = useState(false);

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
    await uploadFileInfolder(parentFolderName,file.name, "this is a file", uploadURL[0], file.size, account_addr);
    const allfileInfo = await getFilesByFolder(account_addr,parentFolderName);
    setfileInfo(allfileInfo);
    setShowImgForm(!showImgForm);
  };

  const createFolder = async () => {
    const status = await createNewFolder(
      account_addr,
      folderName,
      parentFolderName
    );
    const newFolders = await getFoldersByFolder(account_addr, parentFolderName);
    console.log(newFolders);
    setShowForm(!showForm);
    setFolders(newFolders);
  };

  useEffect(() => {
    const getfolders = async () => {
      const folders__ = await getFoldersByFolder(
        account_addr,
        parentFolderName
      );
      setFolders(folders__);
    };
    const getF = async () => {
      const files__ = await getFilesByFolder(account_addr,parentFolderName);
      setfileInfo(files__);
    };
    getfolders();
    getF();
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
        {displayFiles ? (
          <div className="folderContainer">
            {fileInfo !== null &&
              fileInfo.map((fileHash, i) => (
                <Link key={i} as={LinkNext} href={fileHash.ipfsHash}>
                  <div className="folders">
                    <img
                      src="file.png"
                      alt="Folder Icon"
                      className="folderIcon"
                    />
                    {fileHash.name}
                  </div>
                </Link>
              ))}
          </div>
        ) : null}
      </div>
    </>
  );
};
export default FolderPage;
