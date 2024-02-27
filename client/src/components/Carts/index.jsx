import { Button } from "antd";
import React from "react";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

const Carts = () => {
  return (
    <div className="carts h-full max-h-[calc(100vh_-_92px)] flex flex-col">
      <h2 className="bg-gradient-to-r select-none  from-blue-900 via-blue-800 to-blue-700 text-center py-4 text-white font-bold tracking-wide">
        Products in Carts
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 pt-2 overflow-y-auto py-2">
        <li className="cart-item flex justify-between ">
          <div className="flex items-center">
            <img
              src="https://i.lezzet.com.tr/images-xxlarge-secondary/elma-cekirdegi-zehirli-midir-48309b3d-48d3-456f-8433-084af2fdb19c.jpg"
              alt="elma"
              className="w-16 h-16 object-cover"
            />
            <div className="flex flex-col ml-2">
              <b>Elma</b>
              <span>12$ x 2</span>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <Button
              type="primary"
              size="small"
              className="w-full  flex items-center justify-center rounded-full"
              icon={<PlusCircleOutlined />}
            />
            <span className="font-bold ">1</span>
            <Button
              type="primary"
              size="small"
              className="w-full  flex items-center justify-center rounded-full"
              icon={<MinusCircleOutlined />}
            />
          </div>
        </li>
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Subtotal</b>
            <span>20$</span>
          </div>
          <div className="flex justify-between p-2">
            <b>VAT %8</b>
            <span className="text-red-700">+7.9$</span>
          </div>
        </div>
        <div className="mt-4 border-b">
          <div className="flex justify-between p-2">
            <b className="text-lg text-green-500">Total</b>
            <span className="text-xl">20$</span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button type="primary" size="large" className="w-full ">
            Create Order
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-full mt-2 flex items-center justify-center "
            danger
            icon={<ClearOutlined />}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Carts;
