import React, { useState, useEffect } from "react";
import AddCategory from "./AddCategory";
import EditCategories from "./EditCategories";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/categorySlice.js";
import "../style.css";
import { addFilteredCategory, resetFilteredCategory } from "../../redux/appSlice";
import { Spin } from "antd";
const Categories = () => {
  const { categories, status } = useSelector((state) => state.categories);
  const { filteredCategory } = useSelector((state) => state.app);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <ul className= {`md:flex-col gap-4  text-lg flex`}>
      {status === "loading" ? (
        <Spin size="large" className=" p-10 lg:p-0"/>
      ) : categories.length === 0 ? (
        <p className="text-lg text-[#40a9ff] capitalize">
          There is no category. Please add some...
        </p>
      ) : (
        <>
          {filteredCategory !== "" && (
            <li
              className={`rounded-xl bg-blue-400 w-full text-center cursor-pointer p-3 text-white hover:bg-blue-600 `}
              onClick={() => dispatch(resetFilteredCategory())}
            >
              <span>See All Products</span>
            </li>
          )}
          {categories.map((category) => (
            <li
              key={category._id}
              className={`category-item ${
                category._id === filteredCategory &&
                "bg-gradient-to-r from-green-600 to-green-800"
              }`}
              onClick={() => dispatch(addFilteredCategory(category._id))}
            >
              <span>{category.title}</span>
            </li>
          ))}
        </>
      )}
      <li
        className="category-item add-item"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="md:text-2xl " />
      </li>
      <li
        className="category-item edit-item"
        onClick={() => setIsEditModalOpen(true)}
      >
        <EditOutlined className="md:text-2xl " />
      </li>
      <AddCategory
        isModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />
      <EditCategories
        isModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    </ul>
  );
};

export default Categories;
