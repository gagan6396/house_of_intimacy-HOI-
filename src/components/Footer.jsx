import React from "react";
import styles from "../assets/styles/Footer.module.css";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className={`${styles["site-footer"]} bg-light pt-5`}>
      <div className="container">

        {/* FOOTER TOP */}
        <div className={`row gy-4 ${styles["footer-top"]}`}>
          <div className="col-lg-2 col-md-6 text-center">
            <img
              src={logo}
              alt="FLUTE"
              className={styles["footer-logo"]}
            />
          </div>

          <div className="col-lg-4 col-md-6">
            <h5 className="mb-3">Contact Us</h5>
            <p className="mb-1">Email: clientcare@linger.com</p>
            <p className="mb-1">Phone: 0123-456-789</p>
            <p className="mb-1">Hours: Monday — Thursday: 9 AM - 7 PM ET</p>
            <p className="mb-3">Friday: 6 AM - 2 PM ET</p>

            <div className={`d-flex gap-2 ${styles.socials}`}>
              {/* Facebook */}
              <Link to="https://www.facebook.com/" target="_blank" rel="noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="#1877F2"
                    d="M22.675 0h-21.35C.595 0 0 .594 0 1.326v21.348C0 23.406.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .594 23.406 0 22.675 0z"
                  />
                </svg>
              </Link>

              {/* Instagram */}
              <Link to="https://www.instagram.com/" target="_blank" rel="noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="instaGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f58529" />
                      <stop offset="30%" stopColor="#dd2a7b" />
                      <stop offset="60%" stopColor="#8134af" />
                      <stop offset="100%" stopColor="#515bd4" />
                    </linearGradient>
                  </defs>
                  <rect width="24" height="24" rx="5" fill="url(#instaGradient)" />
                  <path
                    fill="#fff"
                    d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.8A3.1 3.1 0 1 1 12 8.6a3.1 3.1 0 0 1 0 6.2zm4.8-8.5a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2z"
                  />
                </svg>
              </Link>

              {/* YouTube */}
              <Link to="https://www.youtube.com/" target="_blank" rel="noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="#FF0000"
                    d="M23.498 6.186a2.97 2.97 0 0 0-2.09-2.103C19.458 3.5 12 3.5 12 3.5s-7.458 0-9.408.583a2.97 2.97 0 0 0-2.09 2.103A30.36 30.36 0 0 0 0 12a30.36 30.36 0 0 0 .502 5.814 2.97 2.97 0 0 0 2.09 2.103C4.542 20.5 12 20.5 12 20.5s7.458 0 9.408-.583a2.97 2.97 0 0 0 2.09-2.103A30.36 30.36 0 0 0 24 12a30.36 30.36 0 0 0-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"
                  />
                </svg>
              </Link>

              {/* Pinterest */}
              <Link to="https://www.pinterest.com/" target="_blank" rel="noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="#E60023"
                    d="M12 0C5.3726 0 0 5.3726 0 12c0 4.98 3.0456 9.2304 7.3656 11.0208-.102-0.9368-.1936-2.376.0408-3.3984.212-0.9264 1.3624-5.8656 1.3624-5.8656s-.3456-.6944-.3456-1.7184c0-1.6112.9344-2.8176 2.096-2.8176.988 0 1.464.7424 1.464 1.632 0 .9936-.6336 2.4768-.9616 3.856-.2736 1.1424.576 2.0752 1.7088 2.0752 2.0496 0 3.6208-2.1648 3.6208-5.2896 0-2.7712-1.9928-4.712-4.8368-4.712-3.2968 0-5.2336 2.4736-5.2336 5.028 0 1.0016.3856 2.0752.864 2.6576.0936.112.1072.2104.08.3248-.0864.3488-.28 1.0736-.3176 1.2224-.0512.2-.1632.2432-.3744.1392-1.3864-.6496-2.252-2.676-2.252-4.3072 0-3.5136 2.56-6.7424 7.3808-6.7424 3.8784 0 6.888 2.7616 6.888 6.4512 0 3.8488-2.4272 6.9552-5.8016 6.9552-1.1336 0-2.2-.5912-2.5528-1.2912l-.6928 2.6288c-.2496.9432-.912 2.128-1.3632 2.85C9.6496 23.8056 10.8048 24 12 24c6.6274 0 12-5.3726 12-12S18.6274 0 12 0z"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* COLUMN LINKS */}
          <div className="col-lg-2 col-md-6">
            <h5 className="mb-3">Quick links</h5>
            <ul className={`list-unstyled ${styles["footer-links"]}`}>
              <li><a href="/about">About Us</a></li>
              <li><a href="/faqs">FAQs</a></li>
              <li><a href="/blogs">Blogs</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5 className="mb-3">Extras</h5>
            <ul className={`list-unstyled ${styles["footer-links"]}`}>
              <li><a href="/bodysuit">Bodysuit</a></li>
              <li><a href="/sets">Lingerie Sets</a></li>
              <li><a href="/swim">Swimwear</a></li>
              <li><a href="/one-piece">One Piece</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5 className="mb-3">Our Service</h5>
            <ul className={`list-unstyled ${styles["footer-links"]}`}>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/refund">Refund Policy</a></li>
              <li><a href="/terms">Terms Of Service</a></li>
            </ul>
          </div>
        </div>

        {/* FOOTER MID */}
        <div className={`${styles["footer-mid"]} border-top border-bottom py-4 mt-4`}>
          <div className="row align-items-center">
            <div className="col-lg-2 col-md-4">
              <h5 className="mb-3">Get 15% Off Your First Order</h5>
              <p className="small text-muted mb-2">
                Be the first to know about new collections, exclusive offers,
                and events.
              </p>

              <div className={`input-group ${styles.newsletter}`}>
                <input type="email" className="form-control" placeholder="Your email" />
                <button className={`btn btn-dark mt-2 ${styles["subscribe-btn"]}`}>
                  Subscribe <span className="ms-2">→</span>
                </button>
              </div>
            </div>

            <div className="col-md-6"></div>

            <div className="col-md-4 text-end">
              <h4 className="mb-2 text-center">Payment Methods</h4>

              <div className={`d-flex justify-content-end gap-2 ${styles["payment-icons"]}`}>
                {/* Your SVG payment icons remain unchanged */}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className={`py-3 d-flex flex-column flex-sm-row justify-content-between align-items-center ${styles["footer-bottom"]}`}>
          <div className="text-muted small">
            © {new Date().getFullYear()}, House Of Intimacy. All rights reserved.
          </div>

          <div className={styles["bottom-links"]}>
            <a href="/privacy" className="me-3 small text-muted">Privacy policy</a>
            <a href="/refund" className="me-3 small text-muted">Refund policy</a>
            <a href="/terms" className="small text-muted">Terms of service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
