import { useRouter } from "next/router";
import { getFoldersByFolder, createNewFolder } from "../../services/folder";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { Stack, Link } from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar";
import LinkNext from "next/link";

const FolderPage = () => {
  const router = useRouter();
  const parentFolderName = router.query.folder;
  const account_addr = useAccount().address;
  const [folders, setFolders] = useState<string[] | null>([]);
  const [folderName, setFolderName] = useState("");
  const [showForm, setShowForm] = useState(false);

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
        {folders !== null
          ? folders.map((folder, i) => (
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
            ))
          : null}
      </Stack>
    </>
  );
};
export default FolderPage;
