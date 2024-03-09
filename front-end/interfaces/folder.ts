import { Address } from "viem";

export interface IFolder{
    name: String,
    files: String[],
    parentFolder: String,
    childFolders: String[],
    owner : Address,
}