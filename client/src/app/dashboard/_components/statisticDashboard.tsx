"use client";
import { formatPrice } from "@/app/_components/format";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";

const Statistic = () => {
  const [period, setPeriod] = useState("month");
  const [statistic, setStatistic] = useState<any>();

  const fetchStatisticData = async () => {
    try {
      const response = await axiosInstance().get("/statistic/", {
        params: { period },
      });
      const { data } = response.data;
      console.log("Response from server:", data);
      setStatistic(data);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  useEffect(() => {
    fetchStatisticData();
  }, [period]);

  return (
    <div className="p-10 flex flex-col gap-5">
      <div className="flex gap-2 items-center">
        <label htmlFor="period" className="font-semibold">
          Select Period:
        </label>
        <select
          id="period"
          value={period}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 w-24"
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="day">Day</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {statistic && (
          <>
            <div className="flex flex-col  gap-2 border rounded-md border-gray-300 bg-white p-5 min-w-60">
              <div className="text-lg flex gap-2 items-center justify-center">
                <img
                  src="https://assets.loket.com/images/dashboard/loket-total-pendapatan.svg"
                  alt=""
                  className="w-5 h-5"
                />
                Total Revenue
              </div>
              <hr />
              <div className="text-2xl text-center font-semibold">
                Rp {formatPrice(statistic.totalRevenueAmount)}
              </div>
            </div>
            <div className="flex flex-col gap-2 border rounded-md border-gray-300 bg-white p-5 min-w-60">
              <div className="text-lg flex gap-2 items-center text-center justify-center">
                <img
                  src="https://assets.loket.com/images/dashboard/loket-total-tiket-terjual.svg"
                  alt=""
                  className="w-5 h-5"
                />
                Total Sold Tickets
              </div>
              <hr />
              <div className="text-2xl text-center font-semibold">
                {statistic.totalSoldTicketsCount}{" "}
                <span className="font-normal text-base">Tickets</span>
              </div>
            </div>
            <div className="flex flex-col  gap-2 border rounded-md border-gray-300 bg-white p-5 min-w-60">
              <div className="text-lg flex gap-2 items-center text-center justify-center">
                <img
                  src="https://assets.loket.com/images/dashboard/loket-total-tiket-terjual.svg"
                  alt=""
                  className="w-5 h-5"
                />
                Total UnSold Tickets
              </div>
              <hr />
              <div className="text-2xl text-center font-semibold">
                {statistic.totalUnsoldTicketsCount}{" "}
                <span className="font-normal text-base">Tickets</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 border rounded-md border-gray-300 bg-white p-5 min-w-60">
              <div className="text-lg flex gap-2 items-center justify-center">
                <img
                  src="https://assets.loket.com/images/dashboard/loket-event-aktif.svg"
                  alt=""
                  className="w-5 h-5"
                />
                Total Events
              </div>
              <hr />
              <div className="text-2xl text-center font-semibold">
                {statistic.totalEvents}{" "}
                <span className="font-normal text-base">Events</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Statistic;
