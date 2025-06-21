import React from "react";
import DealCard from "./DealCard";
import { useAppSelector } from "../../../../State/Store";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Deal = () => {
  const { home } = useAppSelector((store) => store);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="py-5 lg:px-20">

      <div className="slider-container">
      <Slider {...settings}>
        
          
            {home.homePageData?.deals.slice(0, 6).map((item, index) => (
              <div className="flex items-center justify-between">
                <DealCard key={index} item={item} />
              </div>
            ))}
      </Slider>
    </div>

    </div>
  );
};

export default Deal;
