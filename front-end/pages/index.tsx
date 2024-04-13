import React, { useState } from 'react';
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Navbar } from "../components/Navbar";
import { HomeNavbar } from "../components/HomeNavbar";
import { LoginPage } from "../components/LoginPage";
import Loginstyle from "../styles/LoginPage.module.css";

const Home: NextPage = () => {
  const [userfound, setuserfound] = useState(false);
  return (
    <div className={styles.container}>
      <Head>
        <title>CloudiFi</title>
        <meta content="decentralized cloud storage system" name="CloudiFi" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={userfound ? styles.main : Loginstyle.main}>
        {userfound ? <HomeNavbar /> : <LoginPage /> }
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
