import { Address, Hex } from "viem";

export interface IFile{
    name: String,
    description: String,
    ipfsHash: Hex,
    metadata: String,
    size: Number,
    owner: Address,
    createdAt: Date
}