"use client";

import { useGetExpensesByCategoryQuery } from "@/state/api";
import { useMemo, useState } from "react";
import Header from "@/app/(components)/Header";
import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from "recharts";

// NOTE USED
// type AggregatedDataItem = {
//   name: string;
//   color?: string;
//   amount: number;
// };

// type AggregatedData = {
//   [category: string]: AggregatedDataItem;
// };

const sampleData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Expenses = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<String>("");

  // NOT USE
  // const {
  //   data: expensesData,
  //   isLoading,
  //   isError,
  // } = useGetExpensesByCategoryQuery();
  // const expenses = useMemo(() => expensesData ?? [], [expensesData]);


  const classNames = {
    label: "block text-xs font-medium text-gray-700",
    selectInput:
      "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
  };
  
  // NOT USED
  // if (isLoading) {
  //   return <div className="py-4 ">Loading...</div>;
  // }

  // if (isError || !expensesData) {
  //   {
  //     return (
  //       <div className="text-center text-red-500 py-4">
  //         Failed to fetch users
  //       </div>
  //     );
  //   }
  // }
  return (
    <div>
      {/* HEADER */}
      <div>
        <Header name="Expenses" />
        <p className="text-sm text-gray-500">
          A visual representation of expenses over time.
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Filter by Category and Date
          </h3>
          <div className="space-y-4">
            {/* CATEGORY */}
            <div>
              <label htmlFor="category" className={classNames.label}>
                Category
              </label>
              <select
                id="category"
                name="category"
                className={classNames.selectInput}
                defaultValue="All"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Office">Office</option>
                <option value="Professional">Professional</option>
                <option value="Salaries">Salaries</option>
              </select>
            </div>
            {/* START DATE */}
            <div>
              <label htmlFor="start-date" className={classNames.label}>
                Start Date
              </label>
              <input
                id="start-date"
                name="start-date"
                type="date"
                className={classNames.selectInput}
                defaultValue="All"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            {/* END DATE */}
            <div>
              <label htmlFor="end-date" className={classNames.label}>
                End Date
              </label>
              <input
                id="end-date"
                name="end-date"
                type="date"
                className={classNames.selectInput}
                defaultValue="All"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* PIE CHART */}
        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
        <ResponsiveContainer width="100%" height={400}>
        <PieChart width={400} height={400}>
          <Pie
            data={sampleData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {sampleData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip/>
        </PieChart>
        </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
