import axios from "axios";
import { Address } from "viem";
import { IFile } from "@/interfaces/file";
import { IFolder } from "@/interfaces/folder";

export const getAllFolders = async (
  address: Address | null
): Promise<IFolder[] | null> => {
  const url = `${process.env.API_URL}/api/user/${address}/folders`;
  try {
    return await axios.get(url).then((res) => res.data?.data || null);
  } catch (e) {
    return null;
  }
};
