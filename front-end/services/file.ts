import axios from "axios";

export const uploadFile = async (
  name: any,
  description: any,
  ipfsHash: any,
  size: any,
  address: any
) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/files/${address}/uploadFile`;
  try {
    const body = {
      name,
      description,
      ipfsHash,
      size,
      address,
    };
    const { data } = await axios.post(url, body);
  } catch (e) {
    return "failed";
  }
  return "success";
};

export const getAllFiles = async (address: any) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/${address}/myFiles`;
  try {
    const files = await axios.get(url).then((res) => res.data?.data || null);
    console.log(files);
    const file_hashes = [];
    for (let i in files) {
      const obj = {
        name: files[i].name,
        ipfsHash: files[i].ipfsHash,
      };
      file_hashes.push(obj);
    }
    return file_hashes;
  } catch (e) {
    return null;
  }
};
