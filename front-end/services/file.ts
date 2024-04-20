import axios from "axios";

export const uploadFile = async (name: any, description: any, ipfsHash: any, size: any, address: any) => {
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

export const giveAccess = async (filename: any, accessAddress: any, address: any) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/${address}/giveAccess`;
  try {
    const body = {
      filename,
      accessAddress,
      address,
    };
    const { data } = await axios.patch(url, body);
  } catch (e) {
    return "failed ni  de payaa acess";
  }
  return "success access given";
};

export const blockAccess = async (filename: any, accessAddress: any, address: any) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/${address}/blockAccess`;
  try {
    const body = {
      filename,
      accessAddress,
      address,
    };
    const { data } = await axios.post(url, body);
  } catch (e) {
    return "failed ni kr paya block acess";
  }
  return "success  blocked access";
};
