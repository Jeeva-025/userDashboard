"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import useUserStore from "@/store";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const page = () => {
  const data = useUserStore((state) => state.projects);
  const tasks= useUserStore(state=> state.tasks);
  console.log(tasks)

  const getMonthName = (dateString) => {
    const monthIndex = new Date(dateString).getMonth();
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][monthIndex];
  };

  const projectsByMonth = data.reduce((acc, project) => {
    const month = getMonthName(project.startDate);
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const taskByMonth = tasks.reduce((acc, task) => {
    const month = getMonthName(task.startDate);
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const chartLabels = allMonths;
  const chartData = allMonths.map((month) => projectsByMonth[month] || 0);
  const taskData=allMonths.map((month)=> taskByMonth[month] || 0);

  const taskChartData={
    labels:chartLabels,
    datasets:[
      {
        label:"Number of Task",
        data:taskData,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)", // Optional: Fill under the curve
        tension: 0.4, // Makes the line curved
        pointRadius: 2,
        pointBackgroundColor: "#4CAF50",

      }
    ]
  }

  const lineChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Number of Projects",
        data: chartData,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)", // Optional: Fill under the curve
        tension: 0.4, // Makes the line curved
        pointRadius: 2,
        pointBackgroundColor: "#4CAF50",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Projects",
        },
        beginAtZero: true,
      },
    },
  };



  const option = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of tasks",
        },
        beginAtZero: true,
      },
    },
  };




  return (
    <div className="w-full mx-auto">
    <h2 className="text-2xl font-semibold text-center mb-6 ">
      Number of Projects and Tasks Per Month
    </h2>
    <div className="flex flex-wrap justify-between gap-6 ml-4">
      <div className="flex-1 min-w-[300px]">
        <Line data={lineChartData} options={options} />
      </div>
      <div className="flex-1 min-w-[300px]">
        <Line data={taskChartData} options={option} />
      </div>
    </div>
  </div>
  );
};

export default page;
