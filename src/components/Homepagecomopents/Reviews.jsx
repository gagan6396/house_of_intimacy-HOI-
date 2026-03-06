import React, { useState } from 'react';
import Slider from 'react-slick';
import Styles from '../../assets/styles/review.module.css';

// ⚠️  REQUIRED in your index.js or App.js (if not already added):
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const reviews = [
  {
    text: "Vamika – House of Intimacy is one of the best innerwear stores I've visited! They have a premium collection from brands like Jockey, Amanté, Enamor, and Bodycare, and the quality is truly impressive.",
    author: "ARUN NEGI",
  },
  {
    text: "Clean shop, polite staff and great brands. I went to buy for my sister and they guided me very well. Also have a small but nice men's section with Jockey products. Very trustworthy and customer-friendly store.",
    author: "POOJA TARIYAL",
  },
  {
    text: "Loved the variety here! From everyday innerwear to premium collection, everything is neatly arranged. The fitting guidance was very helpful. Perfect place for women's innerwear in the area.",
    author: "JYOTI PANDEY",
  },
  {
    text: "House of Intimacy is now my go-to lingerie store. Quality is genuine, prices are fair and the staff is extremely respectful. They have all sizes in Enamor, Amanté and Bodycare.",
    author: "ASTHA",
  },
  {
    text: "The products of Vamika itself is truly a blessing for all girls — where your innerwear makes you feel more beautiful.",
    author: "ROSTIKA KHADGI",
  },
  {
    text: "Best innerwear store for women! Stylish designs, everyday essentials, and premium ranges too. Also noticed a men's section with Jockey. Overall a great store.",
    author: "PRACHI PANT",
  },
  {
    text: "Superb quality and genuine products. I bought Amanté and Bodycare items — both were authentic and reasonably priced. The store is well-organized and the staff is very polite.",
    author: "SHRIOSHI DOBHAL",
  },
  {
    text: "Really impressed with the collection and service. The staff helped me find the perfect fit without any awkwardness. Definitely coming back for more!",
    author: "MANSHA NEGI",
  },
];

const StarRating = () => (
  <div className={Styles.stars}>
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} className={Styles.star}>&#9733;</span>
    ))}
  </div>
);

const ReviewCard = ({ text, author }) => (
  <div className={Styles.reviewCard}>
    {/* Use HTML entity for reliable quote rendering across all devices */}
    <span className={Styles.quoteOpen}>&ldquo;</span>
    <StarRating />
    <p className={Styles.reviewText}>{text}</p>
    <div className={Styles.authorBlock}>
      <span className={Styles.authorLine} />
      <span className={Styles.authorName}>{author}</span>
    </div>
  </div>
);

export const Reviewssection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    infinite: true,
    // Default: desktop 4 slides
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 3500,
    arrows: false,
    dots: false,
    beforeChange: (_, next) => setActiveSlide(next),
    responsive: [
      // ≤1280px → 3 slides
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      // ≤992px → 2 slides
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      // ≤768px → 1 slide  ← THIS IS THE KEY FIX FOR MOBILE
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          autoplaySpeed: 4000,
        },
      },
    ],
  };

  return (
    <section className={Styles.sectionWrapper}>
      <div className={Styles.inner}>

        {/* Heading */}
        <div className={Styles.headingBlock}>
          <span className={Styles.eyebrow}>What Our Clients Say</span>
          <h2 className={Styles.mainHeading}>
            Words of <span>Love</span>
          </h2>
          <div className={Styles.dividerLine}>
            <span className={Styles.dividerDiamond} />
          </div>
        </div>

        {/* Slider */}
        <div className={Styles.sliderWrapper}>
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={index} className={Styles.slideOuter}>
                <ReviewCard text={review.text} author={review.author} />
              </div>
            ))}
          </Slider>
        </div>

        {/* Progress Dots */}
        <div className={Styles.dotsWrapper}>
          {reviews.map((_, i) => (
            <span
              key={i}
              className={`${Styles.dot} ${i === activeSlide % reviews.length ? Styles.dotActive : ''}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Reviewssection;