"use client";
import { formatPrice } from "@/app/_components/format";
import { axiosInstance } from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default function AllPayment() {
  dayjs.extend(relativeTime);

  const [paymentData, setPaymentData] = useState<any[]>([]);

  const fetchTransaction = async () => {
    try {
      const response = await axiosInstance().get("/transactions/yours");
      const { data } = response.data;
      setPaymentData(data);
      // console.log(response, "ini response");
      console.log(data);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  useEffect(() => {
    fetchTransaction();
    console.log("ini adalah event data", paymentData);
  }, []);
  return (
    <div className="p-10  w-[800px] mx-auto">
      <p className="text-2xl font-semibold text-center">All Payment History</p>
      <div className="mt-5 flex flex-col gap-5">
        {paymentData?.map((payment) => (
          <Link
            href={`/payment/${payment.id}`}
            key={payment.id}
            className="flex flex-col gap-3 rounded-lg shadow-lg border border-gray-300 p-5"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">INV: {payment.no_inv}</p>
              {payment.status !== "paid" && (
                <p className="px-3 py-1 bg-red-600 text-white rounded-lg">
                  {payment.status}
                </p>
              )}
              {payment.status === "paid" && (
                <p className="px-4 py-1 bg-green-500 text-white rounded-lg">
                  {payment.status}
                </p>
              )}
            </div>
            <hr />
            <div className="flex flex-col gap-2">
              <p> Total Payment:</p>
              <div className="flex justify-between">
                <div className="flex gap-5">
                  {payment.total_ticket}×
                  <div className="flex flex-col">
                    <p>{payment.event.title}</p>
                    <p className="text-gray-600 text-sm">
                      {dayjs(payment.event.start_event).format("DD MMMM YYYY")}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {" "}
                      {dayjs(payment.event.start_event).format("HH:mm")} -{" "}
                      {dayjs(payment.event.end_event).format("HH:mm")} WIB
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold ">
                    Rp {formatPrice(payment.total_price)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    total ({payment.total_ticket}){" "}
                    {payment?.total_ticket === 1 ? "ticket" : "tickets"}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {!paymentData && (
        <div>
          <p>You don't have any payment. let's discover events at TiketFest</p>
          <Link
            href={"/"}
            className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 text-center text-lg"
          >
            Discover Here
          </Link>
        </div>
      )}
    </div>
  );
}
