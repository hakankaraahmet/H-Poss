import React, { useState, useEffect } from "react";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/categorySlice.js";
import "./style.css";
const Categories = () => {
  const { categories, status } = useSelector((state) => state.categories);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <ul className="flex md:flex-col gap-4  text-lg">
      {status === "loading" ? (
        <p>Categories are loading...</p>
      ) : (
        categories.map((category) => (
          <li key={category._id} className="category-item">
            <span>{category.title}</span>
          </li>
        ))
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
      <EditCategory
        isModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    </ul>
  );
};

export default Categories;
