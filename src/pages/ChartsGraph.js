import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
 
const data = [
  {
    name: "Mon",
    hrs: 6.1,
  },
  {
    name: "Tue",
    hrs: 3.8,
  },
  {
    name: "Wed",
    hrs: 4.4,
  },
  {
    name: "Thu",
    hrs: 4.15,
  },
  {
    name: "Fri",
    hrs: 5.8,
  },
  {
    name: "Sat",
    hrs: 7,
  },
  {
    name: "Sun",
    hrs: 2.8,
  },
  
];
 
export default function ChartsGraph() {
  return (
    <>
    <h1>Daily Activity</h1>
    <BarChart
      width={700}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="hrs" barSize={40} fill="#4a77ff" />
    </BarChart>
    </>
  );
}