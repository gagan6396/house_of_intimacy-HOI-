import React from 'react';
import Styles from '../../assets/styles/review.module.css';
import Slider from 'react-slick';

// IMPORTANT: Make sure these are imported in your index.js or App.js (if not already):
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const reviews = [
  {
    text: "Vamika – House of Intimacy is one of the best innerwear stores I've visited! They have a premium collection from brands like Jockey, Amanté, Enamor, and Bodycare, and the quality is truly impressive.",
    author: "ARUN NEGI",
  },
  {
    text: "Clean shop, polite staff and great brands. I went to buy for my sister and they guided me very well. They also have a small but nice men's section with Jockey products. Overall, very trustworthy and customer-friendly store.",
    author: "POOJA TARIYAL",
  },
  {
    text: "Loved the variety here! From everyday innerwear to premium collection, everything is neatly arranged. The fitting guidance was very helpful. Perfect place for women's innerwear in the area.",
    author: "JYOTI PANDEY",
  },
  {
    text: "House of Intimacy is now my go-to lingerie store. Quality is genuine, prices are fair and the staff is extremely respectful. They have all sizes available in Enamor, Amanté and Bodycare. Shopping here feels comfortable and hassle-free.",
    author: "ASTHA",
  },
  {
    text: "The products of vamika itself is truly blessings for all girls where your inner make you feel more beautiful.",
    author: "ROSTIKA KHADGI",
  },
  {
    text: "Best innerwear store for women! They have stylish designs, everyday essentials, and premium ranges too. Also noticed a men's section with Jockey. Overall a great store.",
    author: "PRACHI PANT",
  },
  {
    text: "Superb quality and genuine products. I bought Amanté and Bodycare items from here — both were authentic and reasonably priced. The store is well-organized and the staff is very polite.",
    author: "SHRIOSHI DOBHAL",
  },
  {
    text: "Superb quality and genuine products. I bought Amanté and Bodycare items from here — both were authentic and reasonably priced. The store is well-organized and the staff is very polite.",
    author: "MANSHA NEGI",
  },
];

export const Reviewssection = () => {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3500,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          autoplaySpeed: 3000,
        },
      },
    ],
  };

  return (
    <section className={Styles.homePadding}>
      <h1 className={Styles.HeadHome}>Customer Love</h1>
      <div className={Styles.sliderWrapper}>
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className={Styles.Reviews}>
              <div className={Styles.reviewcard}>
                <span className={Styles.quoteleft}>❝</span>
                <p className={Styles.reviewtext}>{review.text}</p>
                <p className={Styles.author}>- {review.author}</p>
                <span className={Styles.quoteright}>❞</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};