import React, { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import ProductItem from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import "../style.css";
import AddProduct from "./AddProducts";
import { Link } from "react-router-dom";
const Products = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { products, status } = useSelector((state) => state.products);
  const { filteredCategory, productSearch } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div className="products-wrapper grid gap-4 grid-cols-card">
      {status === "loading" ? (
        <p>Products are loading...</p>
      ) : products.length === 0 ? (
        <p className="text-lg text-[#40a9ff] capitalize">
          There is no product. Please add some...
        </p>
      ) : filteredCategory ? (
        products
          .filter((product) =>
            product.title.toLowerCase().includes(productSearch)
          )
          .flatMap(
            (product) =>
              product.categoryId._id === filteredCategory && (
                <ProductItem key={product._id} product={product} />
              )
          )
      ) : (
        products
          .filter((product) =>
            product.title.toLowerCase().includes(productSearch)
          )
          .map((product) => <ProductItem key={product._id} product={product} />)
      )}
      <div
        onClick={() => {
          setIsAddModalOpen(true);
        }}
        className=" product-item add-item flex justify-center items-center border rounded-xl hover:shadow-xl cursor-pointer transition-all select-none in-h-[180px]"
      >
        <PlusOutlined className="md:text-3xl text-white " />
      </div>
      <Link
        to={"/products"}
        className=" product-item edit-item flex justify-center items-center border rounded-xl hover:shadow-xl cursor-pointer transition-all select-none min-h-[180px]"
      >
        <EditOutlined className="md:text-3xl text-white " />
      </Link>
      <AddProduct
        isModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />
    </div>
  );
};

export default Products;
