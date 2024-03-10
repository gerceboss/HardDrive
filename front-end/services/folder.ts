import axios from "axios";

export const getAllFolders = async (address: any) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/${address}/folders`;
  try {
    const folders = await axios.get(url).then((res) => res.data?.data || null);
    const folder_names = [];
    for (let i in folders) {
      folder_names.push(folders[i].name);
    }
    return folder_names;
  } catch (e) {
    return null;
  }
};

export const createNewFolder = async (
  address: any,
  folderName: any,
  parentFoldername: any
) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/folder/createFolder`;
  const body = {
    folderName,
    parentFoldername,
    address,
  };
  try {
    const { data } = await axios.post(url, body);
  } catch (e) {
    return "failed";
  }
  return "success";
};

export const getFoldersByFolder = async (
  address: any,
  parentFolderName: any
) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/${address}/folders`;

  try {
    let childFolders = [];
    const folders = await axios.get(url).then((res) => res.data?.data || null);
    for (let i in folders) {
      if (folders[i].name == parentFolderName) {
        childFolders = folders[i].childFolders;
      }
    }
    const childFoldersNames = [];
    for (let i in childFolders) {
      childFoldersNames.push(childFolders[i].name);
    }
    return childFoldersNames;
  } catch (e) {
    return null;
  }
};

export const getFilesByFolder = async (address: any, parentFolderName: any) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/${address}/folders`;

  try {
    let files = [];
    const folders = await axios.get(url).then((res) => res.data?.data || null);
    for (let i in folders) {
      if (folders[i].name == parentFolderName) {
        files = folders[i].files;
      }
    }
    return files;
  } catch (e) {
    return null;
  }
};
