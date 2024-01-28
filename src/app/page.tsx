import styles from "./page.module.css";
import Calculator from "../../calculator";

export default function Home() {
  return (
    <div className={styles.app}>
      <div className={styles.scroll_card}>
        <Calculator />
      </div>
    </div>
  );
}