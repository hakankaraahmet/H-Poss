import { Button, message } from "antd";
import React from "react";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCart,
  increaseCart,
  reduceCart,
  resetCart,
} from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Carts = () => {
  const { cartItems, total, tax } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const taxAmount = (total * tax) / 100;
  const navigate = useNavigate()

  const onDelete = (item) => {
    if (window.confirm("Are you sure to delete the product?")) {
      dispatch(deleteCart(item));
      message.success("Product is deleted successfully");
    }
  };

  const onReduce = (item) => {
    if (item.quantity === 1) {
      if (window.confirm("Are you sure to delete product?")) {
        dispatch(reduceCart(item));
        message.success("Products are deleted successfully");
      }
    } else {
      dispatch(reduceCart(item));
    }
  };

  const onReset = () => {
    if (window.confirm("Are you sure to delete All products?")) {
      dispatch(resetCart());
      message.success("Products are deleted successfully");
    }
  };
  return (
    <div className="carts h-full max-h-[calc(100vh_-_92px)] flex flex-col">
      <h2 className="bg-gradient-to-r select-none  from-blue-900 via-blue-800 to-blue-700 text-center py-4 text-white font-bold tracking-wide">
        Products in Carts
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 pt-2 overflow-y-auto py-2">
        {cartItems?.length === 0 ? (
          <p>There is no product in the cart...</p>
        ) : (
          cartItems?.map((item) => (
            <li key={item._id} className="cart-item flex justify-between ">
              <div className="flex items-center">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-16 h-16 object-contain cursor-pointer"
                  onClick={() => onDelete(item)}
                />
                <div className="flex flex-col ml-2">
                  <b>{item.title}</b>
                  <span>
                    {item.price.toFixed(2)}$ x {item.quantity}
                  </span>
                </div>
              </div>
              <div className="flex items-center ">
                <Button
                  type="primary"
                  size="small"
                  className="w-full  flex items-center justify-center rounded-full"
                  icon={<MinusCircleOutlined />}
                  onClick={() => onReduce(item)}
                />
                <span className="font-bold inline-flex text-center w-6 justify-center">
                  {item.quantity}
                </span>
                <Button
                  type="primary"
                  size="small"
                  className="w-full  flex items-center justify-center rounded-full"
                  icon={<PlusCircleOutlined />}
                  onClick={() => dispatch(increaseCart(item))}
                />
              </div>
            </li>
          )).reverse()
        )}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Subtotal</b>
            <span>{total > 0 ? total.toFixed(2) : 0}$</span>
          </div>
          <div className="flex justify-between p-2">
            <b>VAT %{tax}</b>
            <span className="text-red-700">
              {taxAmount > 0 && "+"}{" "}
              {taxAmount > 0 ? taxAmount.toFixed(2) : taxAmount}$
            </span>
          </div>
        </div>
        <div className="mt-4 border-b">
          <div className="flex justify-between p-2">
            <b className="text-lg text-green-500">Total</b>
            <span className="text-xl">{(total + taxAmount).toFixed(2)}$</span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            type="primary"
            size="large"
            className="w-full "
            disabled={cartItems?.length === 0}
            onClick={() => navigate('/cart')}
          >
            Create Order
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-full mt-2 flex items-center justify-center "
            danger
            icon={<ClearOutlined />}
            onClick={onReset}
            disabled={cartItems?.length === 0}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Carts;
