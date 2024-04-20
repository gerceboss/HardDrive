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

const FolderPage = () => {
  const router = useRouter();
  const parentFolderName = router.query.folder;
  const account_addr = useAccount().address;
  const [folders, setFolders] = useState<string[] | null>([]);
  const [folderName, setFolderName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState<any>();
  const[displayFolders,setdisplayFolders]=useState(true);
  const[displayFiles,setdisplayFiles]=useState(true);
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
      const folders__ = await getFoldersByFolder(account_addr,parentFolderName);
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
    router.push('/profile');
  };


  return (
    <>
    <Sidebar setdisplayFiles={setdisplayFiles} setdisplayFolders={setdisplayFolders}/>
    <div className="NotSidebar">
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

      {displayFolders ? 
                <div className="folderContainer">
                {folders !== null &&
                  folders.map((folder, i) => (
                    <Link key={i} as={LinkNext} href={`/drive/${folder}`}>
                      <div className="folders">
                        {folder}  
                      </div> 
                    </Link>
                  ))}
              </div>
              : null
        }
      {displayFiles ?
       <div className="folderContainer">
        {fileInfo !== null &&
           fileInfo.map((fileHash, i) => (
              <Link 
              key={i} as={LinkNext} href={fileHash.ipfsHash}>
                <div className="folders">
                {fileHash.name}
                </div>
              </Link>
            ))}
      </div> 
          : null}
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
      </div>
    </>
  );
};
export default FolderPage;
