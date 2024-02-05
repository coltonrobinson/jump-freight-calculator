import styles from "./page.module.css";
import Calculator from "./calculator";

export default function Home() {
  return (
    <>
      <div className={styles.app}>


        <div className={styles.title}>
          <h3>Jita Jump Junkies - JF Delivery Service</h3>
        </div>

        <div className={styles.scroll_card}>
          <Calculator />
        </div>
		
      </div>
    </>
  );
}
