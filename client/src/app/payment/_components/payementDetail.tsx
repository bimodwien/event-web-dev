"use client";
import { formatPrice, imgSrc } from "@/app/_components/format";
import { axiosInstance } from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

export default function PaymentDetail() {
  dayjs.extend(relativeTime);
  const router = useRouter();
  const params = useParams();
  const { transactionId } = params;

  const [transaction, setTransaction] = useState<any>();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (transactionId) {
      const fetchEventData = async () => {
        try {
          const response = await axiosInstance().get(
            `/transactions/${transactionId}`
          );
          const { data } = response.data;
          setTransaction(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching transaction data:", error);
        }
      };
      fetchEventData();
    }
  }, [transactionId]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handlePayClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !transactionId) return;

    const formData = new FormData();
    formData.append("paid_proof", file);

    try {
      await axiosInstance().patch(`/transactions/${transactionId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const response = await axiosInstance().get(
        `/transactions/${transactionId}`
      );
      const { data } = response.data;
      setTransaction(data);
      console.log(data);
    } catch (error) {
      console.error("Error submitting payment proof:", error);
    }
  };
  return (
    <div className="p-10 w-[800px] mx-auto">
      <p className="text-2xl font-semibold text-center">
        Transaction Details: {transaction?.event?.title}
      </p>
      {transaction && (
        <div className="flex flex-col gap-5 p-5 shadow-lg rounded-lg border border-gray-200 mt-5">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">
              INVOICE: {transaction.no_inv}
            </p>
            {transaction.status !== "paid" && (
              <p className="px-3 py-1 font-semibold bg-red-600 text-white rounded-lg">
                {transaction.status}
              </p>
            )}
            {transaction.status === "paid" && (
              <p className="px-4 py-1 font-semibold bg-green-500 text-white rounded-lg">
                {transaction.status}
              </p>
            )}
          </div>
          <hr />
          <div className="flex flex-col gap-2">
            <p> Total Payment:</p>
            <div className="flex justify-between">
              <div className="flex gap-5">
                {transaction.total_ticket}×
                <div className="flex flex-col">
                  <p>{transaction.event.title}</p>
                  <p className="text-gray-600 text-sm">
                    {dayjs(transaction.event.start_event).format(
                      "DD MMMM YYYY"
                    )}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {" "}
                    {dayjs(transaction.event.start_event).format(
                      "HH:mm"
                    )} - {dayjs(transaction.event.end_event).format("HH:mm")}{" "}
                    WIB
                  </p>
                  <p className="text-gray-600 text-sm">
                    Hosted by: {transaction.event.user.name}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold ">
                  Rp {formatPrice(transaction.total_price)}
                </p>
                <p className="text-gray-600 text-sm">
                  total ({transaction.total_ticket}){" "}
                  {transaction?.total_ticket === 1 ? "ticket" : "tickets"}
                </p>
              </div>
            </div>
          </div>
          <hr />
          {transaction.total_price !== 0 && (
            <>
              <div className="flex items-center justify-center">
                <div className="flex flex-col w-72 p-3  bg-gray-200 gap-2">
                  <p className="text-center font-semibold">BANK ACCOUNT</p>
                  <p className="text-center text-red-600 font-semibold text-lg">
                    765432101234567
                  </p>
                  <p className="flex justify-between">
                    Merchant Name
                    <span className="font-semibold">TiketFest</span>
                  </p>
                  <p className="flex justify-between">
                    Amount to Pay
                    <span className="font-semibold">
                      Rp {formatPrice(transaction.total_price)}
                    </span>
                  </p>
                </div>
              </div>
              <hr />
            </>
          )}
          {transaction.status === "pending" && (
            <div className="flex flex-col gap-2 items-center pb-5">
              <p>
                Please complete this payment by uploading proof of payment below{" "}
              </p>
              <form className="flex gap-5" onSubmit={handlePayClick}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <button className="w-16 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-500">
                  Pay
                </button>
              </form>
            </div>
          )}
          {transaction.status === "paid" && (
            <div className="flex flex-col gap-2 items-center">
              <p className="text-center text-green-500 text-lg font-semibold">
                congratulations, your transaction was successful
              </p>
              <p className="text-center">
                Thank you for making a transaction at{" "}
                <span className="font-semibold">TiketFest</span>, and enjoy the
                event!
              </p>
              <Link
                href={"/my-ticket"}
                className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 text-center text-lg"
              >
                All My Tickets
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
