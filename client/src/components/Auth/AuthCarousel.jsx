import React from "react";
import { Carousel } from "antd";

const AuthCarousel = () => {
  return (
    <div className="absolute left-0 right-0 top-1/3 3xl:top-1/2 transform -translate-y-1/3 3xl:-translate-y-1/2">
      <Carousel className="pb-10" autoplay>
        <div className="flex">
          <img
            className="w-[300px] 3xl:w-[500px] h-[300px] 3xl:h-[500px] mx-auto"
            src="/slide-1.svg"
          />
          <h3 className="text-4xl text-white text-center font-bold">
            Efficiency Boost
          </h3>
          <p className="text-center text-white mt-5 text-2xl">
            Our React-based POS application streamlines transactions, enhancing
            efficiency for your business.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            className="w-[300px] 3xl:w-[500px] h-[300px] 3xl:h-[500px] mx-auto"
            src="/slide-2.svg"
          />
          <h3 className="text-4xl text-white text-center font-bold">
            User-Friendly Interface
          </h3>
          <p className="text-center text-white mt-5 text-2xl">
            Enjoy a seamless user experience with our intuitive POS application
            designed with React.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            className="w-[300px] 3xl:w-[500px] h-[300px] 3xl:h-[500px] mx-auto"
            src="/slide-3.svg"
          />
          <h3 className="text-4xl text-white text-center font-bold">
            Customizable Solutions
          </h3>
          <p className="text-center text-white mt-5 text-2xl">
            Tailor our H-POS app to meet your specific business needs and
            preferences.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            className="w-[300px] 3xl:w-[500px] h-[300px] 3xl:h-[500px] mx-auto"
            src="/slide-4.svg"
          />
          <h3 className="text-4xl text-white text-center font-bold">
            Real-time Insights
          </h3>
          <p className="text-center text-white mt-5 text-2xl">
            Gain valuable insights into your sales and inventory with real-time
            tracking provided by our H-POS application.
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default AuthCarousel;
