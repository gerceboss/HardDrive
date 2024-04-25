import { useRouter } from "next/router";
import { getFoldersByFolder, createNewFolder } from "../../services/folder";
import { getFilesByFolder, uploadFileInfolder } from "../../services/folder";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { Stack, Link } from "@chakra-ui/react";
import { uploadFile, getAllFiles } from "../../services/file";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import LinkNext from "next/link";
import { useStorageUpload } from "@thirdweb-dev/react";
import { FilePopup } from "../../components/FilePopup";
import { FolderPopup } from "../../components/FolderPopup";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { giveAccess } from "../../services/file";

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
    await uploadFileInfolder(
      parentFolderName,
      file.name,
      "this is a file",
      uploadURL[0],
      file.size,
      account_addr
    );
    const allfileInfo = await getFilesByFolder(account_addr, parentFolderName);
    setfileInfo(allfileInfo);
    setShowImgForm(!showImgForm);
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
      const files__ = await getFilesByFolder(account_addr, parentFolderName);
      setfileInfo(files__);
    };
    getfolders();
    getF();
  }, []);

  const goToProfilePage = () => {
    router.push("/profile");
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
        <div className="upload">
          <button
            className="button-3"
            onClick={() => setShowImgForm(!showImgForm)}
          >
            Upload File
          </button>
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
          {showImgForm ? (
            <FilePopup
              setFile={setFile}
              uploadToIpfs={uploadToIpfs}
              setShowImgForm={setShowImgForm}
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
                      src="/folder.png"
                      alt={"folderImg"}
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
                        alt={"folderImg"}
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
export default FolderPage;
