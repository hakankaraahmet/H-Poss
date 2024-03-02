import React from "react";

const StatisticCards = ({item}) => {
  return (
    <div key={item.id} className=" bg-gray-800 text-white flex gap-x-4 p-8 rounded-2xl">
      <div className=" p-2 bg-white rounded-full">
        <img
          className="w-12 h-12 rounded-full"
          src={item.image}
          alt={item.title}
        />
      </div>
      <div className="flex flex-col justify-between">
        <h3 className="text-slate-400 capitalize text-lg">{item.title}</h3>
        <span className="text-xl font-bold">{item.info}</span>
      </div>
    </div>
  );
};

export default StatisticCards;
