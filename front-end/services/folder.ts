import axios from "axios";
import { Address } from "viem";
import { IFolder } from "../interfaces/folder";

export const getAllFolders = async (address: any) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/${address}/folders`;
  console.log(url);
  try {
    return await axios.get(url).then((res) => res.data?.data || null);
  } catch (e) {
    return null;
  }
};

export const createNewFolder = async (
  address: any,
  folderName: any,
  parentFolderName: any
) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/folder/createFolder`;
  const body = {
    folderName,
    parentFolderName,
    address,
  };
  try {
    const {data} = await axios.post(url, body);
    console.log(data);
  } catch (e) {
    return "failed";
  }
  return "success";
};
