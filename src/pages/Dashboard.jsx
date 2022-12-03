import React from 'react';

import { ChartsHeader, PieChart, LineChart } from '../components';
import { earningData, pieChartData } from '../assets/data';
import { Area } from '../pages';

const Dashboard = () => {
  return (
    <div className="mt-20 md:mt-12">
      <div className="">
        {/* The Cards Section */}
        <div className="flex flex-col m-10 gap-4 justify-between items-center md:flex-row md:flex-wrap ">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="flex flex-row justify-between items-center gap-x-2 h-24 w-[330px] bg-white dark:text-gray-200 dark:bg-cardDark p-6 rounded-xl"
            >
              <div className="flex flex-row">
                <button
                  type="button"
                  style={{
                    color: item.iconColor,
                    backgroundColor: item.iconBg,
                  }}
                  className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
                >
                  {item.icon}
                </button>
                <div className="flex flex-col ml-4">
                  <span className="text-sm text-gray-400  mt-1">
                    {item.title}
                  </span>
                  <span className="text-xl font-semibold tracking-wider">
                    {item.amount}
                  </span>
                </div>
              </div>
              <p className={`text-lg text-${item.pcColor} ml-2`}>
                {item.percentage}
              </p>
            </div>
          ))}
        </div>
        {/* The Charts Section */}
        <div className="grid lg:grid-cols-3 m-4 md:m-10 gap-4">
          <div className=" p-6 lg:col-span-2 bg-white dark:bg-cardDark rounded-2xl">
            <ChartsHeader category="Line" title="Inflation Rate" />
            <div className="w-full">
              <LineChart />
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-cardDark rounded-2xl">
            <ChartsHeader category="Pie" title="Project Cost Breakdown" />
            <div className="w-full">
              <PieChart
                id="chart-pie"
                data={pieChartData}
                legendVisiblity
                height="full"
              />
            </div>
          </div>
        </div>
        <div>
          <Area />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
