import styles from "./page.module.css";
import Calculator from "./calculator";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="./images/favicon-32x32.png" sizes="any" />
      </Head>
      <div className={styles.app}>
        <div className={styles.scroll_card}>
          <Calculator />
        </div>
      </div>
    </>
  );
}
