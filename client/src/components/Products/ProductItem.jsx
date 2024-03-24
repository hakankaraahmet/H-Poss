import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity: 1 }));
    message.success("Product is added successfully");
  };


  return (
    <div
      onClick={handleClick}
      className="product-item border rounded-xl hover:shadow-xl cursor-pointer transition-all select-none"
    >
      <div className="product-image">
        <img
          src={baseUrl + product.image[0]}
          alt={product.title}
          className="h-28 object-contain w-full border-b rounded-t-xl "
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
