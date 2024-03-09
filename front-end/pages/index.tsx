import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Navbar } from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>CloudiFi</title>
        <meta content="decentralized cloud storage system" name="CloudiFi" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <Navbar />
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by GROUP-7
        </a>
      </footer>
    </div>
  );
};

export default Home;
