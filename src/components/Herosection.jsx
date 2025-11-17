import React, { useState } from "react";
import styles from "../assets/styles/Home.module.css";

import img1 from "../assets/images/5.jpg";
import img2 from "../assets/images/17.jpg";
import img3 from "../assets/images/19.jpg";

const slides = [
  {
    id: 1,
    eyebrow: "Effortless Elegance, Under The Sun",
    title: (
      <>
        Your Perfect Fit For Every
        <br />
        Shoreline Moment
      </>
    ),
    image: img1,
    cta: { label: "Feel The Fit", href: "#fit" },
  },
  {
    id: 2,
    eyebrow: "Move. Lounge. Repeat.",
    title: (
      <>
        Confidence & Comfort
        <br />
        That Go Wherever You Do
      </>
    ),
    image: img2,
    cta: { label: "Shop New", href: "#shop" },
  },
  {
    id: 3,
    eyebrow: "Sun Ready Styles",
    title: (
      <>
        From Tide To Table—
        <br />
        You’re Covered
      </>
    ),
    image: img3,
    cta: { label: "Explore Collection", href: "#explore" },
  },
];

export default function Herosection() {
  const [i, setI] = useState(0);
  const [shutterActive, setShutterActive] = useState(false);

  const changeSlide = (newIndex) => {
    setShutterActive(true);

    setTimeout(() => {
      setI(newIndex);
      setTimeout(() => setShutterActive(false), 700);
    }, 350);
  };

  const next = () => changeSlide((i + 1) % slides.length);
  const prev = () => changeSlide((i - 1 + slides.length) % slides.length);
  const go = (idx) => changeSlide(idx);

  const s = slides[i];

  return (
    <section className={styles.shore_hero}>
      {/* Background image */}
      <img src={s.image} className={styles.hero_bg_image} alt="" />

      {/* Shutter */}
      <div
        className={`${styles.shutter} ${
          shutterActive ? styles.shutterActive : ""
        }`}
      >
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className={styles.shutter_slice} />
        ))}
      </div>

      {/* Overlay + content */}
      <div className={styles.shore_hero__shade} />

      <div className={styles.shore_hero__content}>
        <p className={styles.eyebrow}>{s.eyebrow}</p>
        <h1 className={styles.title}>{s.title}</h1>
        <a className={styles.cta} href={s.cta.href}>
          {s.cta.label}
        </a>
      </div>

      {/* Arrows */}
      <div className={styles.shore_hero__nav}>
        <button className={styles.navbtn} onClick={prev}>
          ‹
        </button>
        <button className={styles.navbtn} onClick={next}>
          ›
        </button>
      </div>

      {/* Dots */}
      <div className={styles.shore_hero__dots}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => go(idx)}
            className={`${styles.dotbtn} ${
              idx === i ? styles.dotActive : ""
            }`}
          />
        ))}
      </div>
    </section>
  );
}
