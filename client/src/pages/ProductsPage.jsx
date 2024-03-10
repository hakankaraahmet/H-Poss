import React from "react";
import EditProducts from "../components/Products/EditProducts";
const ProductsPage = () => {
  return (
    <div className="px-6">
      <h1 className="text-4xl font-bold text-center mb-4">Products</h1>
      <EditProducts />
    </div>
  );
};

export default ProductsPage;
