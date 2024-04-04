import { useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { Navbar } from '../../components/Navbar';
import { update } from '../../services/profile';
import { Button } from "@chakra-ui/react"; 
import { useRouter } from 'next/router'; 

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

      <Navbar />

      <main className={styles.main}>
        <h1>Update Profile</h1>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          {error && <p>{error}</p>}
          <Button onClick={handleUpdate}>Save</Button>
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

export default UpdateProfilePage;
