import React from "react";
import { Carousel } from "antd";

const AuthCarousel = () => {
  return (
    <div className="absolute left-0 right-0 top-1/3 3xl:top-1/2 transform -translate-y-1/3 3xl:-translate-y-1/2">
      <Carousel className="pb-10" autoplay>
        <div className="flex">
          <img className="w-[300px] 3xl:w-[500px] h-[300px] 3xl:h-[500px] mx-auto" src="/slide-1.svg" />
          <h3 className="text-4xl text-white text-center font-bold">
            Responsive
          </h3>
          <p className="text-center text-white mt-5 text-2xl">
            Compatible with all device sizes
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img className="w-[300px] 3xl:w-[500px] h-[300px] 3xl:h-[500px] mx-auto" src="/slide-2.svg" />
          <h3 className="text-4xl text-white text-center font-bold">
            Responsive
          </h3>
          <p className="text-center text-white mt-5 text-2xl">
            Compatible with all device sizes
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img className="w-[300px] 3xl:w-[500px] h-[300px] 3xl:h-[500px] mx-auto" src="/slide-3.svg" />
          <h3 className="text-4xl text-white text-center font-bold">
            Responsive
          </h3>
          <p className="text-center text-white mt-5 text-2xl">
            Compatible with all device sizes
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img className="w-[300px] 3xl:w-[500px] h-[300px] 3xl:h-[500px] mx-auto" src="/slide-4.svg" />
          <h3 className="text-4xl text-white text-center font-bold">
            Responsive
          </h3>
          <p className="text-center text-white mt-5 text-2xl">
            Compatible with all device sizes
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default AuthCarousel;
