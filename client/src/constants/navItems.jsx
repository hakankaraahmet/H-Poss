import {
  ShoppingCartOutlined,
  HomeOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";

export const navItems = [
  {
    id: 0,
    name: "Home",
    link: "#",
    icon: <HomeOutlined className="text-xl md:text-2xl" />,
  },
  {
    id: 1,
    name: "Cart",
    link: "#",
    badge: true,
    icon: (
      <Badge count={5}>
        <ShoppingCartOutlined className="text-xl md:text-2xl" />
      </Badge>
    ),
  },
  {
    id: 2,
    name: "Bills",
    link: "#",
    icon: <CopyOutlined className="text-xl md:text-2xl" />,
  },
  {
    id: 3,
    name: "Customers",
    link: "#",
    icon: <UserOutlined className="text-xl md:text-2xl" />,
  },
  {
    id: 4,
    name: "Statistics",
    link: "#",
    icon: <BarChartOutlined className="text-xl md:text-2xl" />,
  },
  {
    id: 5,
    name: "Logout",
    link: "#",
    icon: <LogoutOutlined className="text-xl md:text-2xl" />,
  },
];
