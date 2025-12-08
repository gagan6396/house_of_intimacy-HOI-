import React, { Component } from "react";
import Herosection from "../../components/Homepagecomopents/Herosection.jsx";
import Offermarquee from "../../components/Homepagecomopents/Offermarquee.jsx";
import Bestsellers from "../../components/Homepagecomopents/Bestsellers.jsx";
import BestChoice from "../../components/Homepagecomopents/BestChoice.jsx";
import VideoPlayer from "../../components/Homepagecomopents/VideoPlayer.jsx";
import CategoryStrip from "../../components/Homepagecomopents/CategoryStrip.jsx";
import ShopByCategory from "../../components/Homepagecomopents/ShopByCategory.jsx";
import NewArrival from "../../components/Homepagecomopents/NewArricalSection.jsx";
import JockeyColorSlider from "../../components/Homepagecomopents/JockeyColorSlider.jsx";
import Banner1 from "../../assets/images/HomeBanner/Banner1.webp";
import Styles from "../../assets/styles/InstaReels.module.css";
import nightwearImg from "../../assets/images/5.jpg";
import Slider from "react-slick";
import BlogCards from "../../components/Homepagecomopents/Blogs.jsx";
import { Link } from 'react-router-dom'; 
import ProductSection1 from "./ProductSection1.jsx";




export default function Home() {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    swipeToSlide: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,

    afterChange: function(index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    }
  };
  // **********BLOGS*********************
  

  return (
    <>
    <CategoryStrip/>
      <Herosection/>
      <NewArrival/>
      <Offermarquee/>
      <JockeyColorSlider/>
      <ShopByCategory/>
      {/* <InstaReels /> */}
      {/* <Bestsellers/>  */}
      {/* <BestChoice/>   */}
      <section className="">
       <img src={Banner1} className="d-block w-100" alt="Banner" />
        </section>
        <section className={Styles.homePadding} >
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
               <h1 className={Styles.HeadHomes}>Vamika (house Of Intimacy)in Sahastradhara Road, Dehradun</h1>
                <p className={Styles.ParaHome}>Vamika (house Of Intimacy) in Dehradun is one of the leading businesses in the Readymade
                   Garment Retailers. Also known for Readymade Garment Retailers, Bra Retailers, Women Undergarment Retailers, Undergarment Retailers-Jockey, Men Undergarment Retailers-Calvin Klein, Bra Retailers-Enamor, Men Undergarment Retailers-Jockey, Men Undergarment Retailers and much more. Find Address, Contact Number, Reviews & Ratings, Photos, Maps of Vamika (house Of Intimacy), Dehradun.
                </p><br/>
                <p className={Styles.ParaHome}>Vamika (house Of Intimacy) in Dehradun is one of the leading businesses in the Readymade
                   Garment Retailers. Also known for Readymade Garment Retailers, Bra Retailers, Women Undergarment Retailers, Undergarment Retailers-Jockey, Men Undergarment Retailers-Calvin Klein, Bra Retailers-Enamor, Men Undergarment Retailers-Jockey, Men Undergarment Retailers and much more. Find Address, Contact Number, Reviews & Ratings, Photos, Maps of Vamika (house Of Intimacy), Dehradun.
                </p>
                <Link to="/about-us" className={Styles.blogcardbutton1}>
                          Read More
                        </Link>
              
                </div>
                <div className="col-md-6">
                  <div className={Styles.HomeImg}>
                    <img src={nightwearImg} alt="image1"/>
                  </div>
                </div>
            </div>

          </div>
        </section>
        {/***********ProductSection1**********************/}
      <ProductSection1/>
       {/* **********Blogs*************** */}
      <section className={Styles.HomePadding}>
      <div className="container-fluid">
       <h1 className={Styles.HeadHome}>Blogs</h1>
       <BlogCards />
      </div>
     </section>
      
     {/**************** *Reviews******************** */}
     <section className={Styles.homePadding} >
      <div className="slider-container">
        <h1 className={Styles.HeadHome}>Customer Love</h1>
        {/* <div className={Styles.UnderHrLine}></div> */}
      <Slider {...settings}>
        <div className={Styles.Reviews}>
          <div className={Styles.reviewcard}>
            <span className={Styles.quoteleft}>❝</span>
            <p className={Styles.reviewtext}>Vamika – House of Intimacy is one of the best innerwear stores I’ve visited! They have a premium collection from brands like Jockey, Amanté, Enamor, and Bodycare, and the quality is truly impressive.</p>
            <p className={Styles.author}>- ARUN NEGI</p>
            <span className={Styles.quoteright}>❞</span>
          </div>
        </div>
        <div className={Styles.Reviews}>
          <div className={Styles.reviewcard}>
            <span className={Styles.quoteleft}>❝</span>
            <p className={Styles.reviewtext}>Clean shop, polite staff and great brands." I went to buy for my sister and they guided me very well. 
              They also have a small but nice men’s section with Jockey products. Overall, very trustworthy and customer-friendly store.</p>
            <p className={Styles.author}>- POOJA TARIYAL</p>
            <span className={Styles.quoteright}>❞</span>
          </div>
        </div>
        <div className={Styles.Reviews}>
          <div className={Styles.reviewcard}>
            <span className={Styles.quoteleft}>❝</span>
            <p className={Styles.reviewtext}>Loved the variety here! From everyday innerwear to premium collection, everything is neatly arranged.
              The fitting guidance was very helpful. Perfect place for women's innerwear in the area.</p>
            <p className={Styles.author}>- JYOTI PANDEY</p>
            <span className={Styles.quoteright}>❞</span>
          </div>
        </div>
        <div className={Styles.Reviews}>
          <div className={Styles.reviewcard}>
            <span className={Styles.quoteleft}>❝</span>
            <p className={Styles.reviewtext}>House of Intimacy is now my go-to lingerie store." Quality is genuine, prices are fair and the staff is extremely respectful.
              They have all sizes available in Enamor, Amanté and Bodycare. Shopping here feels comfortable and hassle-free.</p>
            <p className={Styles.author}>- ASTHA</p>
            <span className={Styles.quoteright}>❞</span>
          </div>
        </div>
        <div className={Styles.Reviews}>
          <div className={Styles.reviewcard}>
            <span className={Styles.quoteleft}>❝</span>
            <p className={Styles.reviewtext}>The products of vamika itself is truly blessings for all girls where your inner make you feel more beautiful</p>
            <p className={Styles.author}>- ROSTIKA KHADGI</p>
            <span className={Styles.quoteright}>❞</span>
          </div>
        </div>
        <div className={Styles.Reviews}>
          <div className={Styles.reviewcard}>
            <span className={Styles.quoteleft}>❝</span>
            <p className={Styles.reviewtext}>"Best innerwear store for women!" They have stylish designs, everyday essentials, 
              and premium ranges too. Also noticed a men’s section with Jockey. Overall a great store.</p>
            <p className={Styles.author}>- PRACHI PANT</p>
            <span className={Styles.quoteright}>❞</span>
          </div>
        </div>
        <div className={Styles.Reviews}>
          <div className={Styles.reviewcard}>
            <span className={Styles.quoteleft}>❝</span>
            <p className={Styles.reviewtext}>"Superb quality and genuine products." I bought Amanté and Bodycare items from here — both were authentic and reasonably priced.
               The store is well-organized and the staff is very polite.</p>
            <p className={Styles.author}>- SHRIOSHI DOBHAL</p>
            <span className={Styles.quoteright}>❞</span>
          </div>
        </div>
        <div className={Styles.Reviews}>
          <div className={Styles.reviewcard}>
            <span className={Styles.quoteleft}>❝</span>
            <p className={Styles.reviewtext}>Superb quality and genuine products." I bought Amanté and Bodycare items from here — both were authentic and reasonably priced. 
              The store is well-organized and the staff is very polite.</p>
            <p className={Styles.author}>- MANSHA NEGI</p>
            <span className={Styles.quoteright}>❞</span>
          </div>
        </div>
      </Slider>
    </div>
     </section>

      <VideoPlayer/>

      
    </>
  );
}
