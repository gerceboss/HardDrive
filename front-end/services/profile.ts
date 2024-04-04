import axios from "axios";
// import validator from 'validator';

export const profile = async(address: any) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/${address}/profile`;
  try {
    const userProfile = await axios.get(url).then((res) => res.data || null);
    console.log(userProfile);
    return userProfile;
    }
    catch(e){
        return null;
    }
};

export const update = async (name:string, email:string , address:any) => {
  // if (!validator.isEmail(email)) {
  //   throw new Error('invalid email address');
  // }
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/${address}/update`;
  const body = {
    name: name,
    email: email,
    address: address
  };

  try {
    const response = await axios.put(url, body);
    if (response.status === 200) {
      console.log('User profile updated successfully');
      return true; 
    } else {
      throw new Error('Failed to update user profile');
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false; 
  }
};