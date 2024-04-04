import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link'; 
import styles from '../../styles/Home.module.css';
import { Navbar } from '../../components/Navbar';
import { profile } from '../../services/profile';
import { useAccount } from "wagmi";
import { Button } from "@chakra-ui/react"; 
import { useRouter } from 'next/router'; 

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<any>({ name: '', email: '', address: '' });
  const account_addr = useAccount().address;
  const router = useRouter(); 

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const address = account_addr;
        const userProfile = await profile(address);
        setUserData(userProfile || { name: 'enter the name', email: 'enter the email', address: 'enter the address' });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile(); 
  }, [account_addr]); 

  const goToUpdatePage = () => {
    router.push('/update'); 
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Profile | CloudiFi</title>
        <meta name="description" content="User Profile" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <h1>User Profile</h1>
        <div>
          <h2>Name: {userData.name}</h2>
          <p>Email: {userData.email}</p>
          <p>Address: {userData.address}</p>
        </div>
        <div>
          <Button onClick={goToUpdatePage}>Edit Profile</Button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by GROUP-7
        </a>
      </footer>
    </div>
  );
};

export default ProfilePage;
