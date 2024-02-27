import React from "react";
import Categories from "../components/Categories";
import Carts from "../components/Carts";
import Products from "../components/Products";
const HomePage = () => {
  return (
    <div>
      <div className="home px-6 flex flex-col md:flex-row justify-between gap-10 pb-24 md:pb-0">
        <div className="categories  overflow-auto max-h-[calc(100vh_-_112px)] pb-4 md:pb-10 md:mr-0  ">
          <Categories />
        </div>
        <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10">
          <Products />
        </div>
        <div className="carts min-w-[300px] md:-mr-6 md:-mt-6 border md:border-l">
          <Carts />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
