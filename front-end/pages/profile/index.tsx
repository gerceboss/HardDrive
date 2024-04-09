import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from "@chakra-ui/react";
import { Navbar } from '../../components/Navbar';
import { profile } from '../../services/profile';
import { useAccount } from "wagmi";
import styles from '../../styles/Profile.module.css';
import { Title } from '../../components/Title';
import { ProfileNavbar } from '../../components/ProfileNavbar';

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<any>({ name: '', email: '', address: '' });
  const accountAddr = useAccount().address;
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await profile(accountAddr);
        console.log(userProfile)
        setUserData(userProfile.data || { name: 'Name not available', email: 'Email not available', address: 'Address not available' });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [accountAddr]);

  const goToUpdatePage = () => {
    router.push('/update');
    
  };


  return (
    <div className={styles.container}>
      <ProfileNavbar />

      <main className={styles.main}>
        <img src="AkshatProfilePhoto.jpg" width="200px" height="200px"></img>
        <h1>Hi There!</h1>
        <div className={styles.profileInfo}>
          <h2>Name: {userData.name}</h2>
          <p>Email: {userData.email}</p>
          <p>Address: {userData.address}</p>
          <Button className={styles.editButton} onClick={goToUpdatePage}>Edit Profile</Button>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Made with ❤️ by GROUP-7</p>
      </footer>
    </div>
  );
};

export default ProfilePage;
