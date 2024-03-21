import { useEffect, useState } from "react";
import StatisticCards from "../components/Statistics/StatisticCards";
import { Spin } from "antd";
import { Area, Pie } from "@ant-design/plots";
import { useDispatch, useSelector } from "react-redux";
import { fetchBills } from "../redux/billSlice";
import { fetchProducts } from "../redux/productSlice";
import { fetchUser } from "../redux/userSlice";
const StatisticPage = () => {
  const [userName, setUserName] = useState("");
  const { products } = useSelector((state) => state.products);
  const { bills, status } = useSelector((state) => state.bills);
  const { user } = useSelector((state) => state.user);
  const userToken = sessionStorage.getItem("userToken");
  const dispatch = useDispatch();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    dispatch(fetchBills());
    dispatch(fetchProducts());
  }, []);

  const transformedBills = Object.values(
    bills.reduce((acc, { customerName, subTotal }) => {
      acc[customerName] = acc[customerName] || { customerName, subTotal: 0 };
      acc[customerName].subTotal += subTotal;
      return acc;
    }, {})
  );

  const totalAmount = () => {
    const amount = bills.reduce((total, item) => item.totalAmount + total, 0);
    return `${amount.toFixed(2)}$`;
  };

  const config = {
    data: transformedBills,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    data: transformedBills,
    angleField: "subTotal",
    colorField: "customerName",
    isStack: true,
    paddingRight: 80,
    innerRadius: 0.6,
    label: {
      text: "subTotal",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "top",
        rowPadding: 5,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: "Total\nValue",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 20,
          fontStyle: "bold",
        },
      },
    ],
  };

  const statisticsCards = [
    {
      id: 0,
      title: "Total Customer",
      info: [...new Set(bills.map((item) => item.customerName))].length,
      image: "/person.svg",
    },
    {
      id: 1,
      title: "Total Income",
      info: totalAmount(),
      image: "/money.svg",
    },
    {
      id: 2,
      title: "Total Sales",
      info: bills.length,
      image: "/sale.svg",
    },
    {
      id: 3,
      title: "Total Products",
      info: products.length,
      image: "/product.svg",
    },
  ];

  useEffect(() => {
    dispatch(fetchUser({ token: userToken }));
  }, []);

  useEffect(() => {
    async function fetchUserName() {
      try {
        const res = await fetch(`${baseUrl}/users/${user?.userId}`);
        const data = await res.json();
        setUserName(data.data.username);
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
    fetchUserName();
  }, [user]);

  return (
    <div className="px-6 pb-20">
      <h1 className="text-4xl font-bold text-center mb-4 select-none">
        Statistics
      </h1>
      <div className="statistic-section">
        <h2 className="text-lg">
          Welcome{" "}
          <span className="text-green-700 font-bold text-xl capitalize">
            {userName}
          </span>
        </h2>
        <div className="statistic-cards grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-8 my-8 ">
          {statisticsCards.map((item) => (
            <StatisticCards item={item} key={item.id} />
          ))}
        </div>
        <div className="flex flex-col lg:flex-row gap-10 justify-between ">
          <div className="lg:w-1/2 h-72 lg:h-1/2 relative">
            {status === "succeeded" ? (
              <Area {...config} />
            ) : (
              <Spin
                size="large"
                className="absolute top-1/2 h-screen w-screen flex justify-center"
              />
            )}
          </div>
          <div className="lg:w-1/2 h-72 lg:h-full relative">
            {status === "succeeded" ? (
              <Pie {...config2} />
            ) : (
              <Spin
                size="large"
                className="absolute top-1/2 h-screen w-screen flex justify-center"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticPage;
