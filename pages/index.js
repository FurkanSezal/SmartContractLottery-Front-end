import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
//import Manual_Header from "../components/Manual_Header";
import Header from "../components/Header";
import LotteryEnterance from "../components/LotteryEnterance";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart Contract Lottery App</title>
        <meta name="description" content="Our Smart Contract Lottery App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <LotteryEnterance />
    </div>
  );
}
