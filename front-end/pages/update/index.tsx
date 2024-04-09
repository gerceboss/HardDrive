import { useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/Profile.module.css';
import { Navbar } from '../../components/Navbar';
import { update } from '../../services/profile';
import { Button } from "@chakra-ui/react"; 
import { useRouter } from 'next/router'; 
import { ProfileNavbar } from '../../components/ProfileNavbar';

const UpdateProfilePage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); 
  
  const handleUpdate = async () => {
    try {
      const success = await update(name, email, address);
      if (success) {
        console.log('Profile updated successfully');
        router.push('/profile'); 
      } else {
        setError('Failed to update profile');
      }
    } catch (error) {
      setError('Error updating profile');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Update Profile | CloudiFi</title>
        <meta name="description" content="Update User Profile" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
  
      <ProfileNavbar />
  
      <main className={styles.main}>
        <h1>Update Profile</h1>
        <div className={styles.formContainer}>
          <div className={styles.formField}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {error && <p>{error}</p>}
          <Button className="button-3" onClick={handleUpdate}> Save </Button>
        </div>
      </main>
  
      <footer className={styles.footer}>
        <a rel="noopener noreferrer" target="_blank">
          Made with ❤️ by GROUP-7
        </a>
      </footer>
    </div>
  );  
};

export default UpdateProfilePage;