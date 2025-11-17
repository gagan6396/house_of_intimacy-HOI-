import React from "react";
import styles from "../assets/styles/Offermarquee.module.css";

const Offermarquee = () => {
  return (
    <section className={styles.offerMarquee}>
      <div className={styles.marquee}>
        <span className={styles.marqueeText}>
          BUY 2 GET 1 FREE&nbsp; BUY 2 GET 1 FREE&nbsp; BUY 2 GET 1 FREE&nbsp;
          BUY 2 GET 1 FREE&nbsp; BUY 2 GET 1 FREE&nbsp; BUY 2 GET 1 FREE&nbsp;
        </span>

        <span className={styles.marqueeText}>
          BUY 2 GET 1 FREE&nbsp; BUY 2 GET 1 FREE&nbsp; BUY 2 GET 1 FREE&nbsp;
          BUY 2 GET 1 FREE&nbsp; BUY 2 GET 1 FREE&nbsp; BUY 2 GET 1 FREE&nbsp;
        </span>
      </div>
    </section>
  );
};

export default Offermarquee;
