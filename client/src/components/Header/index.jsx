import React from "react";
import { Link } from "react-router-dom";
import { Input } from "antd";
import { useSelector } from "react-redux";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  SearchOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const navItems = [
    {
      id: 0,
      name: "Home",
      link: "/",
      icon: <HomeOutlined className="text-xl md:text-2xl" />,
    },
    {
      id: 1,
      name: "Cart",
      link: "/cart",
      badge: true,
      icon: (
        <Badge count={cartItems.length}>
          <ShoppingCartOutlined className="text-xl md:text-2xl" />
        </Badge>
      ),
    },
    {
      id: 2,
      name: "Bills",
      link: "/bills",
      icon: <CopyOutlined className="text-xl md:text-2xl" />,
    },
    {
      id: 3,
      name: "Customers",
      link: "/customers",
      icon: <UserOutlined className="text-xl md:text-2xl" />,
    },
    {
      id: 4,
      name: "Statistics",
      link: "/statistics",
      icon: <BarChartOutlined className="text-xl md:text-2xl" />,
    },
    {
      id: 5,
      name: "Logout",
      link: "/",
      icon: <LogoutOutlined className="text-xl md:text-2xl" />,
    },
  ];

  return (
    <div className="border-2 mb-6">
      <header className="header py-4 px-6 flex justify-between items-center gap-10 3xl:w-2/3 3xl:mx-auto">
        <div className="logo">
          <Link to="/">
            <h2 className="text-2xl font-bold md:text-4xl">H-POS</h2>
          </Link>
        </div>
        <div className="header-search flex-1 justify-center">
          <Input
            size="large"
            placeholder="Find Product"
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
          />
        </div>
        <div
          className={`menu-links flex justify-between items-center gap-7 md:static  bottom-0 w-screen bg-white
        md:bg-transparent md:w-auto left-0 border-t md:border-t-0 md:px-0 px-4 py-2 fixed z-50`}
        >
          {navItems.map((navItem) => (
            <Link
              to={navItem.link}
              className={`flex flex-col items-center hover:text-[#40a9ff] transition-all ${
                navItem.badge && "hidden md:flex"
              }`}
              key={navItem.id}
            >
              {navItem.icon}
              <span className="md:text-xs text-[10px] mt-1">
                {navItem.name}
              </span>
            </Link>
          ))}
        </div>
        <Link
          to="/"
          className={`flex flex-col items-center hover:text-[#40a9ff] transition-all md:hidden`}
        >
          <Badge count={cartItems.length}>
            <ShoppingCartOutlined className="text-2xl" />
          </Badge>
          <span className="text-xs ">Cart</span>
        </Link>
      </header>
    </div>
  );
};

export default Header;
