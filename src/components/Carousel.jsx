import React, { useEffect, useRef, useState } from "react";
import styles from "../assets/styles/Carousel.module.css";
import img5 from "../assets/images/5.jpg";
import img17 from "../assets/images/17.jpg";
import img19 from "../assets/images/19.jpg";

const HeroSplit = ({
  eyebrow = "Beachwear Bikinis That Speak Confidence",
  titleLines = ["Beachwear Bikinis"],
  captions = ["Classic Swim Sets", "Minimal Triangle Tops", "Summer Collection"],
  cta = { label: "See What's Trending", href: "#" },
  images = [
    {
      main: img5,
      thumb: img5,
      eyebrow: "New Arrival",
      titleLines: ["Beachwear Bikinis"],
      captions: ["Classic Swim Sets", "Minimal Triangle Tops", "Summer Collection"],
      cta: { label: "See What's Trending", href: "#" },
    },
    {
      main: img17,
      thumb: img17,
      eyebrow: "Limited Drop",
      titleLines: ["Sun-kissed Styles"],
      cta: { label: "Explore Collection", href: "#" },
    },
    {
      main: img19,
      thumb: img19,
      eyebrow: "Editor's Pick",
      titleLines: ["Minimal Triangle Tops"],
    },
    {
      main: img5,
      thumb: img5,
      eyebrow: "Editor's Pick",
      titleLines: ["Minimal Triangle Tops"],
    },
  ],
}) => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const [index, setIndex] = useState(0);
  const rafRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      setContainerHeight(images.length * vh);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [images.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || images.length === 0) return;

    el.style.height = `${containerHeight}px`;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const elemTop = window.scrollY + rect.top;
        const elemHeight = containerHeight;

        const current = window.scrollY;
        let progress = (current - elemTop) / (elemHeight - vh);
        progress = Math.max(0, Math.min(1, progress));

        const count = Math.max(1, images.length);
        const nextIndex = Math.floor(progress * count);
        const safeIdx = Math.min(count - 1, Math.max(0, nextIndex));

        setIndex((prev) => (prev === safeIdx ? prev : safeIdx));
      });
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerHeight, images.length]);

  const contentFor = (imgIndex) => {
    const img = images[imgIndex] || {};
    return {
      eyebrow: img.eyebrow ?? eyebrow,
      titleLines: img.titleLines ?? titleLines,
      captions: img.captions ?? captions,
      cta: img.cta ?? cta,
    };
  };

  return (
    <section
      className={styles.heroSplit}
      ref={containerRef}
      aria-label="Hero split"
    >
      <div
        className={`${styles.heroSplitInner} ${styles.sticky}`}
        ref={stickyRef}
      >
        {/* LEFT: stacked panels */}
        <div className={styles.heroSplitLeft}>
          {images.map((img, i) => {
            const {
              eyebrow: eb,
              titleLines: tl,
              captions: caps,
              cta: itemCta,
            } = contentFor(i);
            return (
              <div
                key={`left-${i}`}
                className={`${styles.leftContent} ${
                  i === index ? styles.isActive : ""
                }`}
                aria-hidden={i !== index}
              >
                <p className={styles.eyebrow}>{eb}</p>

                <h2 className={styles.heroTitle}>
                  {tl.map((line, idx) => (
                    <span
                      key={idx}
                      className={styles.heroTitleLine}
                    >
                      {line}
                    </span>
                  ))}
                </h2>

                <div className={styles.heroCaptions}>
                  {caps.map((c, idx) => (
                    <div key={idx} className={styles.heroCaption}>
                      {c}
                    </div>
                  ))}
                </div>

                <div className={styles.heroCta}>
                  <a
                    className={`${styles.btn} ${styles.primary}`}
                    href={itemCta.href}
                    aria-label={itemCta.label}
                  >
                    <span>{itemCta.label}</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        d="M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <button
                    className={`${styles.btn} ${styles.outline}`}
                    aria-hidden
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        d="M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: images */}
        <div className={styles.heroSplitRight} aria-hidden>
          {images.map((img, i) => (
            <div
              key={`main-${i}`}
              className={`${styles.heroImage} ${styles.heroImageMain} ${
                i === index ? styles.isActive : ""
              }`}
              aria-hidden={i !== index}
              style={{ zIndex: i === index ? 5 : 1 }}
            >
              <img src={img.main} alt={`feature-${i}`} loading="eager" />
            </div>
          ))}

          {images.map((img, i) => (
            <div
              key={`thumb-${i}`}
              className={`${styles.heroImage} ${styles.heroImageThumb} ${
                i === index ? styles.isActive : ""
              }`}
              aria-hidden={i !== index}
              style={{ zIndex: i === index ? 6 : 2 }}
            >
              <img src={img.thumb} alt={`thumb-${i}`} loading="eager" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSplit;
