// NavigationSwiper.js
import { Swiper } from "swiper/react"; // Import the Swiper component
import "swiper/css"; // Import Swiper styles

const NavigationSwiper = ({ children }) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      navigation // Enables navigation arrows
      pagination={{ clickable: true }} // Enables pagination
    >
      {children}
    </Swiper>
  );
};

export default NavigationSwiper; // Ensure it's a default export
