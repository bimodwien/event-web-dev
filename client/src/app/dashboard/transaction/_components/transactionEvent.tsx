"use client";

import { axiosInstance } from "@/lib/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { formatPrice } from "@/app/_components/format";

export default function TransactionEvent() {
  dayjs.extend(relativeTime);
  const params = useParams();
  const { eventId } = params;

  const image = "http://localhost:8001/transactions/proof/";

  const [transactions, setTransactions] = useState<any[]>([]);
  const fetchTransaction = async () => {
    try {
      const response = await axiosInstance().get(
        `/transactions/event/${eventId}`
      );
      const { data } = response.data;
      console.log(response.data, "ini response");
      setTransactions(data);
      // console.log(data);
      console.log(eventId);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [eventId]);

  return (
    <div className="p-10">
      <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-200 px-1 py-3 text-center">
          <tr>
            <th className="">Invoice</th>
            <th className="">Name</th>
            <th className="">Tiket</th>
            <th className="">Total</th>
            <th className="">Paid At</th>
            <th className="">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100  text-center text-sm">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="py-2 px-1">{transaction.no_inv}</td>
              <td className="py-2 px-1">{transaction.user.username}</td>
              <td className="py-2 px-1">{transaction.total_ticket}</td>
              <td className="py-2 px-1">
                Rp {formatPrice(transaction.total_price)}
              </td>
              {!transaction.paid_at ? (
                <td className="py-2 px-1">-</td>
              ) : (
                <td className="py-2 px-1">
                  {dayjs(transaction.paid_at).format("DD/MMM/YY HH:mm")}
                </td>
              )}
              <td className="px-2 py-1">
                <span
                  className={`py-1 px-3 w-full rounded-lg ${
                    transaction.status === "paid"
                      ? "bg-green-500"
                      : transaction.status === "pending"
                      ? "bg-orange-400"
                      : transaction.status === "cancelled"
                      ? "bg-red-600"
                      : ""
                  } text-white `}
                >
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
