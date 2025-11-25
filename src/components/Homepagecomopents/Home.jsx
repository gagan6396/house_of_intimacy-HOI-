import React from "react";
import Herosection from "../../components/Homepagecomopents/Herosection.jsx";
import Offermarquee from "../../components/Homepagecomopents/Offermarquee.jsx";
import Bestsellers from "../../components/Homepagecomopents/Bestsellers.jsx";
import ProductSection from "../../components/Homepagecomopents/Productsection.jsx";
import BestChoice from "../../components/Homepagecomopents/BestChoice.jsx";
import ColorsSelector from "../../components/Homepagecomopents/ColorsSelector.jsx";
import VideoPlayer from "../../components/Homepagecomopents/VideoPlayer.jsx";
import CategoryStrip from "../../components/Homepagecomopents/CategoryStrip.jsx";
import ShopByCategory from "../../components/Homepagecomopents/ShopByCategory.jsx";
import NewArrival from "../../components/Homepagecomopents/NewArricalSection.jsx";
import JockeyColorSlider from "../../components/Homepagecomopents/JockeyColorSlider.jsx";




export default function Home() {
  

  return (
    <>
    <CategoryStrip/>
      <Herosection/>
      <NewArrival/>
      <ColorsSelector/>
      <Offermarquee/>
      <JockeyColorSlider/>
      <ShopByCategory/>
      <Bestsellers/> 
      <BestChoice/>  
      <ProductSection/>
      <VideoPlayer/>
      
    </>
  );
}
