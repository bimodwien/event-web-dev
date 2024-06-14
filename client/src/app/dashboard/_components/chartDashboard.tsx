// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import { axiosInstance } from "@/lib/axios"; // Sesuaikan dengan lokasi file axiosInstance

// const ChartDashboard: React.FC = () => {
//   const [data, setData] = useState<{
//     totalRevenueAmount: number;
//     totalSoldTicketsCount: number;
//     totalEvents: number;
//     totalUnsoldTicketsCount: number;
//   } | null>(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axiosInstance().get("/statistic");
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching statistics data:", error);
//     }
//   };

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   const {
//     totalSoldTicketsCount,
//     totalUnsoldTicketsCount,
//     totalRevenueAmount,
//     totalEvents,
//   } = data;

//   const chartData = {
//     labels: ["Tickets"], // Label untuk sumbu X, misalnya bisa diganti dengan label lain jika diperlukan
//     datasets: [
//       {
//         label: "Tickets Sold",
//         data: [totalSoldTicketsCount],
//         backgroundColor: "#EA906C",
//         barThickness: 20,
//       },
//       {
//         label: "Remaining Tickets",
//         data: [totalUnsoldTicketsCount],
//         backgroundColor: "#666699",
//         barThickness: 20,
//       },
//     ],
//   };

//   const options = {
//     indexAxis: "y" as const, // This makes the chart horizontal
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top" as const,
//       },
//       title: {
//         display: true,
//         text: "Event Tickets",
//       },
//       tooltip: {
//         callbacks: {
//           label: function (tooltipItem: any) {
//             const label = tooltipItem.dataset.label || "";
//             const value = tooltipItem.raw;
//             return `${label}: ${value}`;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         type: "linear" as const,
//         title: {
//           display: true,
//           text: "Number of Tickets",
//         },
//         ticks: {
//           callback: function (value: number) {
//             // Adjusted callback to expect number type
//             return value.toString();
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div>
//       <div>
//         <h2>Event Tickets</h2>
//         <Bar data={chartData} options={options} />
//       </div>
//     </div>
//   );
// };

// export default ChartDashboard;
