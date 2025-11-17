import React, { useState, useEffect, useRef } from 'react';
import styles from '../assets/styles/Header.module.css';
import { Link } from 'react-router-dom';
import logoDark from '../assets/images/logo.png';
import logoLight from '../assets/images/logo.png';

const Caret = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
    <path
      d="M5 7l5 6 5-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);

const IconSearch = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      cx="11"
      cy="11"
      r="7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M20 20l-3.2-3.2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <circle
      cx="12"
      cy="8"
      r="4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M4 20c0-4 4-6 8-6s8 2 8 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const IconCart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M6 6h15l-1.5 9H8L6 4H3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
  </svg>
);

const IconMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M3 6h18M3 12h18M3 18h18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const IconClose = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M6 6l12 12M18 6l-12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const firstLinkRef = useRef(null);

  // lock background scroll while drawer is open
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (open) {
      root.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
    } else {
      root.style.overflow = '';
      body.style.overflow = '';
    }
    return () => {
      root.style.overflow = '';
      body.style.overflow = '';
    };
  }, [open]);

  // close with ESC
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // focus first link when opening
  useEffect(() => {
    if (open && firstLinkRef.current) firstLinkRef.current.focus();
  }, [open]);

  // Helper to close when drawer link clicked
  const closeAnd = (fn) => (e) => {
    if (typeof fn === 'function') fn(e);
    setOpen(false);
  };

  // Observe hero section or fallback to scrollY
  useEffect(() => {
    const hero = document.getElementById('hero');

    if (hero && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setScrolled(!entry.isIntersecting);
          });
        },
        { root: null, threshold: 0.01 }
      );
      io.observe(hero);
      return () => io.disconnect();
    } else {
      const onScroll = () => setScrolled(window.scrollY > 80);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, []);

  const logoSrc = scrolled ? logoDark : logoLight || logoDark;

  return (
    <header
      className={`${styles.nav} ${
        scrolled ? styles['nav--solid'] : styles['nav--transparent']
      }`}
    >
      <div className={styles.nav__inner}>
        {/* Left: Logo + menu */}
        <div className={styles.nav__left}>
          <Link to="/" className={styles.nav__logo} aria-label="FLUTE Home">
            <img
              src={logoSrc}
              alt="FLUTE Logo"
              className={styles['nav__logo-img']}
            />
          </Link>

          <nav className={styles.nav__menu} aria-label="Primary">
            <div
              className={`${styles.nav__item} ${styles['nav__item--has-submenu']}`}
            >
              <a href="#swimwear" className={styles.nav__link}>
                SWIMWEAR <Caret />
              </a>
              <div className={styles.nav__submenu} role="menu">
                <a
                  href="#onepiece"
                  role="menuitem"
                  className={styles['nav__submenu-link']}
                >
                  One Pieces
                </a>
                <a
                  href="#bikinis"
                  role="menuitem"
                  className={styles['nav__submenu-link']}
                >
                  Bikinis
                </a>
                <a
                  href="#coverups"
                  role="menuitem"
                  className={styles['nav__submenu-link']}
                >
                  Cover-ups
                </a>
              </div>
            </div>

            <div className={styles.nav__item}>
              <a href="#beachwear" className={styles.nav__link}>
                BEACHWEAR
              </a>
            </div>

            <div
              className={`${styles.nav__item} ${styles['nav__item--has-submenu']}`}
            >
              <a href="#lingerie" className={styles.nav__link}>
                LINGERIE SETS <Caret />
              </a>
              <div className={styles.nav__submenu} role="menu">
                <a
                  href="#bralettes"
                  role="menuitem"
                  className={styles['nav__submenu-link']}
                >
                  Bralettes
                </a>
                <a
                  href="#pushup"
                  role="menuitem"
                  className={styles['nav__submenu-link']}
                >
                  Push-up
                </a>
                <a
                  href="#lace"
                  role="menuitem"
                  className={styles['nav__submenu-link']}
                >
                  Lace
                </a>
              </div>
            </div>

            <div className={styles.nav__item}>
              <a href="#our-story" className={styles.nav__link}>
                OUR STORY
              </a>
            </div>

            <div className={styles.nav__item}>
              <a
                href="#features"
                className={`${styles.nav__link} ${styles['nav__link--active']}`}
              >
                FEATURES
              </a>
            </div>
          </nav>
        </div>

        {/* Right: Utilities (desktop) */}
        <div className={styles.nav__actions}>
          <a href="#search" className={styles.nav__action}>
            <IconSearch /> <span>SEARCH</span>
          </a>
          <a href="#account" className={styles.nav__action}>
            <IconUser /> <span>ACCOUNT</span>
          </a>
          <a href="#cart" className={styles.nav__action}>
            <IconCart /> <span>CART</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className={styles['nav__burger']}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen((o) => !o)}
        >
          <IconMenu />
        </button>
      </div>

      {/* Backdrop */}
      <button
        type="button"
        className={`${styles['nav__backdrop']} ${
          open ? styles['is-open'] : ''
        }`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        tabIndex={open ? 0 : -1}
      />

      {/* Right drawer */}
      <aside
        id="mobile-drawer"
        className={`${styles['nav__drawer']} ${
          open ? styles['is-open'] : ''
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className={styles['nav__drawer-head']}>
          <span className={styles['nav__drawer-title']}>Menu</span>
          <button
            type="button"
            className={styles['nav__drawer-close']}
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <IconClose />
          </button>
        </div>

        <div className={styles['nav__drawer-body']}>
          <a
            href="#swimwear"
            className={styles['nav__drawer-link']}
            onClick={closeAnd()}
            ref={firstLinkRef}
          >
            SWIMWEAR
          </a>
          <a
            href="#beachwear"
            className={styles['nav__drawer-link']}
            onClick={closeAnd()}
          >
            BEACHWEAR
          </a>
          <a
            href="#lingerie"
            className={styles['nav__drawer-link']}
            onClick={closeAnd()}
          >
            LINGERIE SETS
          </a>
          <a
            href="#our-story"
            className={styles['nav__drawer-link']}
            onClick={closeAnd()}
          >
            OUR STORY
          </a>
          <a
            href="#features"
            className={`${styles['nav__drawer-link']} ${
              styles['is-active']
            }`}
            onClick={closeAnd()}
          >
            FEATURES
          </a>

          <div className={styles['nav__drawer-sep']} />

          <a
            href="#search"
            className={styles['nav__drawer-link']}
            onClick={closeAnd()}
          >
            <IconSearch /> <span>SEARCH</span>
          </a>
          <a
            href="#account"
            className={styles['nav__drawer-link']}
            onClick={closeAnd()}
          >
            <IconUser /> <span>ACCOUNT</span>
          </a>
          <a
            href="#cart"
            className={styles['nav__drawer-link']}
            onClick={closeAnd()}
          >
            <IconCart /> <span>CART</span>
          </a>
        </div>
      </aside>
    </header>
  );
}
