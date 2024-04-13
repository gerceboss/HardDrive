import axios from "axios";

export const createuser = async (name:string, email:string , address:any) => {
    // if (!validator.isEmail(email)) {
    //   throw new Error('invalid email address');
    // }
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/createUser`;
    const body = {
      name: name,
      email: email,
      address: address
    };
  
    try {
      const response = await axios.post(url, body);
      if (response.status === 200) {
        console.log('User profile created successfully');
        return true; 
      } else {
        throw new Error('Failed to create user profile');
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
      return false; 
    }
  };