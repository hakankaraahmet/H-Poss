import React from "react";

const ProductItem = ({ product }) => {
  return (
    <div className="product-item border rounded-xl hover:shadow-xl cursor-pointer transition-all select-none">
      <div className="product-image">
        <img
          src={product.img}
          alt={product.title}
          className="h-28 object-cover w-full border-b rounded-t-xl "
        />
      </div>
      <div className="product-info flex flex-col p-3">
        <span className="font-bold capitalize">{product.title}</span>
        <span>{product.price}$</span>
      </div>
    </div>
  );
};

export default ProductItem;
