"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import useUserStore from "@/store";
import DatePicker from "react-datepicker"; // Import React DatePicker
import "react-datepicker/dist/react-datepicker.css"; // DatePicker styles
import { saveAs } from "file-saver"; 

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });



const page = () => {


  // Fetch data from the Zustand store
  const data = useUserStore((state) => state.projects);
  const tasks = useUserStore((state) => state.tasks);
  const users =  useUserStore((state) => state.users);
  
 
  

  const [date, setDate] = useState(null);
  const[startDate, setStartDate]=useState();
  const[endDate, setEndDate]=useState();
  
  

  const handleChange=(dates)=>{
    console.log(dates);
    const[start, end]=dates
    setStartDate(start);
    console.log(startDate);
    console.log(new Date());
    setEndDate(end);
    console.log(endDate)
  }

  const handleClear=()=>{
   setStartDate();
   setEndDate();
  }

  useEffect(()=>{

  },[])

  // Calculate role counts dynamically after users data is loaded

  
    
      const roleCounts = users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {});
     
     const pieChartData=Object.values(roleCounts);
     
     
      
      
  


  

  // Function to get the month name from a date string
  const getMonthName = (dateString) => {
    const monthIndex = new Date(dateString).getMonth();
    return [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ][monthIndex];
  };


  const filterDataByDateRange = (items) => {
    // If no startDate is selected, return all items
    if (!startDate) return items;
  
    // If endDate is provided, filter based on startDate and endDate as-is
    if (endDate) {
      return items.filter((item) => {
        const itemDate = new Date(item.startDate);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });
    }
  
    // If endDate is not provided, set endDate to startDate and calculate startDate as 3 months prior
    let end = new Date(startDate);
    let start = new Date(end);
    start.setMonth(start.getMonth() - 3); // Subtract 3 months from the end date
  
    // Filter items by the calculated date range
    return items.filter((item) => {
      const itemDate = new Date(item.startDate);
      return itemDate >= start && itemDate <= end;
    });
  };




  // Calculate the number of tasks and project by month
  const calculateByMonth = (items) => {
    return items.reduce((acc, item) => {
      const month = getMonthName(item.startDate);
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});
  };

  const filteredProjects = startDate ? filterDataByDateRange(data) : data;
const filteredTasks = startDate ? filterDataByDateRange(tasks) : tasks;
const projectsByMonth = calculateByMonth(filteredProjects);
const tasksByMonth = calculateByMonth(filteredTasks);


  // List of all months
  const allMonths = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // Prepare data for charts
  const chartLabels = allMonths;
  const chartData = allMonths.map((month) => projectsByMonth[month] || 0);
  const taskData = allMonths.map((month) => tasksByMonth[month] || 0);

  // Prepare data for the Pie chart
  


  const [chartOptions] = useState({
    chart: {
      type: "area",
      toolbar: { show: false }, // Disable toolbar (zoom, pan, etc.)
    },
    dataLabels: {
      enabled: false, // Hide data labels on the chart
    },
    grid: {
      strokeDashArray: 8, // Makes grid lines dashed
    },
    xaxis: {
      categories: chartLabels,
    },
    yaxis: {
      title: { text: "Number of Projects" },
    },
    title: {
      text: "Projects by Month",
      align: "center",
    },
    stroke: {
      curve: "smooth", // Smooth curve,
      width:3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        gradientToColors: ["#90caf9"], // Blue gradient
        stops: [0, 100],
      },
    },
    colors: ["#2196f3"], // Line color
  });



  const [barChartOptions] = useState({
    chart: {
      type: "bar",
      toolbar: { show: false }, // Disable toolbar (zoom, pan, etc.)
    },
    dataLabels: {
      enabled: false, // Hide data labels on the chart
    },
    grid: {
      strokeDashArray: 8, // Makes grid lines dashed
    },
    xaxis: {
      categories: chartLabels,
    },
    yaxis: {
      title: { text: "Number of Tasks" },
    },
    title: {
      text: "Tasks by Month",
      align: "center",
    },
    stroke: {
      curve: "smooth", // Smooth curve,
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        gradientToColors: ["#ffcc80"], // Orange gradient
        stops: [0, 100],
      },
    },
    colors: ["#ff9800"], // Line color
  });
  const calculateTotalRoles = () => {
    return pieChartData.reduce((acc, val) => acc + val, 0);
  };
  const ans=calculateTotalRoles();

 
  const [donutChartOptions] = useState({
    chart: {
      type: "donut",
      toolbar: { show: false }, // Disable toolbar
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: -10,
              fontSize: "18px",
              color: "#333",
            },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: 600,
              color: "#2196f3",
              formatter: (val) => val,
            },
            total: {
              show: true,
              label: `Total No. of users`,
              fontSize: "16px",
              color: "#666",
              
            },
          },
        },
      },
    },
    labels: ["Admin","Member"],
    title: {
      text: "User Roles",
      align: "center",
    },
    dataLabels: {
      enabled: false, // Hide data labels on the chart
    },
    legend: {
      position: "right", // Position legend to the right
      labels: {
        colors: "#333",
        useSeriesColors: true,
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} Users`,
      },
    },
    colors: ["#ff9800", "#2196f3"], // Colors for Admin and Member
  });


  const donutChartSeries = pieChartData; 










  const exportToCSV = () => {
    const getMonthYear=(date)=>{
      return new Date(date).toLocaleDateString("en-US",{
        month:"short",
        year:"numeric"
      })
    }

    const MonthsandYear=new Set();
    const rows=[["Months", "No. of Projects", "No. of Tasks"]];
  
    filteredProjects.forEach((project) => {
      const monYear=getMonthYear(project.startDate);

      if(MonthsandYear.has(monYear)) return;

      MonthsandYear.add(monYear);

      const projectCount=filteredProjects.filter((p)=> getMonthYear(p.startDate)===monYear).length;
      const taskCount=filteredTasks.filter((t)=> getMonthYear(t.startDate)===monYear).length;
      rows.push([monYear, projectCount, taskCount]);
      
    });
    
  
    let csvContent =
      "data:text/csv;charset=utf-8," + rows.map((row) => row.join(",")).join("\n");
      
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "analytics_report.csv");
    document.body.appendChild(link);
    link.click();
  };


  const maxEndDate=startDate? new Date(startDate) : new Date();
  maxEndDate.setMonth(maxEndDate.getMonth()+3);
  

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between items-center mr-4">
        <h2 className="text-3xl font-semibold text-left ml-6 mb-6 p-4">Analytics</h2>
        <div className="flex justify-end space-x-2">
          <button onClick={handleClear} className="bg-blue-600 text-white border rounded-lg px-7 py-2 h-[40px]">
            show All
          </button>
        <DatePicker
        minDate={startDate} // End date cannot be earlier than start date
        maxDate={maxEndDate}
        scrollableMonthYearDropdown
           monthsShown={2}
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            onChange={handleChange}
            className="px-4 py-3 h-[40px] border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 text-gray-800"
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
          />

          <button  onClick={exportToCSV} className="bg-blue-600 text-white border rounded-lg px-7 py-2 h-[40px]">
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mx-6 mb-4">
        {/* Line Chart */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold">Total No. of Projects</h2>
          <p className="text-[10px]">View total count of projects to manage your workspace efficiently</p>
          <div className="h-[300px]">
          <Chart
          options={chartOptions}
          series={[{ name: "Projects", data: chartData }]}
          type="area"
          height={300}
        />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold">Total No. of Tasks</h2>
          <p className="text-[10px]">View total count of tasks to manage your workspace efficiently</p>
          <div className="h-[300px]">
          <Chart
              options={barChartOptions}
              series={[{ name: "Tasks", data: taskData }]}
              type="bar"
              height={300}
            />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold">Total No. of User Roles</h2>
          <p className="text-[10px]">View total number of users and their roles to manage your team structure</p>
          <div className="h-[300px]">
          {users && <Chart
              options={donutChartOptions}
              series={donutChartSeries}
              type="donut"
              height={300}
            />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
