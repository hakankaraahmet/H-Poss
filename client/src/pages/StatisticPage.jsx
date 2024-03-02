import { useState, useEffect } from "react";
import StatisticCards from "../components/Statistics/StatisticCards";
import { statisticsCards } from "../constants/statistics";
import { Area, Pie } from "@ant-design/plots";
const StatisticPage = () => {
  const [data, setData] = useState([]);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  const data2 = [
    {
      type: "分类一",
      value: 27,
    },
    {
      type: "分类二",
      value: 25,
    },
    {
      type: "分类三",
      value: 18,
    },
    {
      type: "分类四",
      value: 15,
    },
    {
      type: "分类五",
      value: 10,
    },
    {
      type: "其他",
      value: 5,
    },
  ];

  const config = {
    data,
    xField: "timePeriod",
    yField: "value",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data: data2,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "AntV\nG2Plot",
      },
    },
  };
  return (
    <div className="px-6 pb-20">
      <h1 className="text-4xl font-bold text-center mb-4 select-none">
        Statistics
      </h1>
      <div className="statistic-section">
        <h2 className="text-lg">
          Welcome{" "}
          <span className="text-green-700 font-bold text-xl capitalize">
            admin
          </span>
        </h2>
        <div className="statistic-cards grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-8 my-8 ">
          {statisticsCards.map((item) => (
            <StatisticCards item={item} />
          ))}
        </div>
        <div className="flex flex-col lg:flex-row gap-10 justify-between ">
          <div className="lg:w-1/2 h-72 lg:h-1/2">
            <Area {...config} />
          </div>
          <div className="lg:w-1/2 h-72 lg:h-full">
            <Pie {...config2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticPage;
