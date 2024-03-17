import React from "react";
import Categories from "../components/Categories";
import Carts from "../components/Carts";
import Products from "../components/Products";
const HomePage = () => {
  return (
    <div>
      <div className="home px-6 flex flex-col md:flex-row justify-between gap-10 pb-24 md:pb-0">
        <div className="categories md:w-[20%] lg:w-[15%]  overflow-auto max-h-[calc(100vh_-_112px)] pb-4 md:pb-10 md:mr-0  ">
          <Categories />
        </div>
        <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10">
          <Products />
        </div>
        <div className="carts md:w-[20%] md:-mr-6 md:-mt-6 border md:border-l h-screen">
          <Carts />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
