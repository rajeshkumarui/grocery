import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
   // speed: 2000,
    autoplaySpeed: 4000,
    //cssEase: "linear",
  };
  const hotelCards = [
    {
      imageSrc:
        "https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fboolfly%2Fbanner%2F4500-x-1125_Engage_1_.jpg&w=1920&q=75",
      title: "Studio Room",
      description: "Lorem ipsum dolor sit amet, consectur dolori",
      pricingText: "USD 50/Day",
      features: ["Free Wifi", "Free breakfast"],
    },
    {
      imageSrc:
        "https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fboolfly%2Fbanner%2Fkorean_4500-x-1125.jpg&w=1920&q=75",
      title: "Deluxe Room",
      description: "Lorem ipsum dolor sit amet, consectur dolori",
      pricingText: "USD 80/Day",
      features: ["Free Wifi", "Free breakfast"],
    },
    {
      imageSrc:
        "https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fboolfly%2Fbanner%2F4500-x-1125_4_.jpg&w=1920&q=75",
      title: "King Deluxe Room",
      description: "Lorem ipsum dolor sit amet, consectur dolori",
      pricingText: "USD 150/Day",
      features: ["Free Wifi", "Free breakfast", "Discounted Meals"],
    },
    {
      imageSrc:
        "https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fboolfly%2Fbanner%2F4500-x-1125_Pink-Salt_1_.jpg&w=1920&q=75",
      title: "Royal Suite",
      description: "Lorem ipsum dolor sit amet, consectur dolori",
      pricingText: "USD 299/Day",
      features: [
        "Free Wifi",
        "Free breakfast",
        "Discounted Meals",
        "MacBook for work use (hotel's property)",
      ],
    },
    {
      imageSrc:
        "https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fboolfly%2Fbanner%2Ffesival_4500-x-1125_1_.jpg&w=1920&q=75",
      title: "Royal Suite",
      description: "Lorem ipsum dolor sit amet, consectur dolori",
      pricingText: "USD 299/Day",
      features: [
        "Free Wifi",
        "Free breakfast",
        "Discounted Meals",
        "MacBook for work use (hotel's property)",
      ],
    },
  ];

  return (
    <div className="content" style={{ marginTop: "2rem", cursor: 'grab', marginBottom:'4rem' }}>
      <Slider {...settings}>
        {hotelCards.map((card, index) => (
          <div key={index}>
            <img alt={card.title} src={card.imageSrc} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
