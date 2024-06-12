"use client";

import { axiosInstance } from "@/lib/axios";
import { TEvent } from "@/models/event.mode";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { formatPrice, imgSrc } from "@/app/_components/format";
import { FaCoins } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { TUser } from "@/models/user.model";
import PointVoucher from "@/models/pointVoucher.model";

interface Params {
  eventId: string;
}

const getTicketPrice = (eventData: TEvent | undefined): number => {
  if (!eventData) return 0;

  const currentDate = new Date();
  const isPromoActive =
    eventData.promotion &&
    eventData.start_promo &&
    eventData.end_promo &&
    currentDate > new Date(eventData.start_promo) &&
    currentDate < new Date(eventData.end_promo);

  return isPromoActive ? eventData.promo_price : eventData.ticket_price;
};

const Transaction = () => {
  dayjs.extend(relativeTime);
  const params = useParams();
  const router = useRouter();
  const { eventId } = params;

  const [eventData, setEventData] = useState<TEvent>();
  const [pointVoucher, setPointVoucher] = useState<PointVoucher | null>(null);
  const [point, setPoint] = useState(false);
  const [voucher, setVoucher] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [ticketCount, setTicketCount] = useState(1);

  useEffect(() => {
    if (eventId) {
      const fetchEventData = async () => {
        try {
          const response = await axiosInstance().get(`/events/${eventId}`);
          const { data } = response.data;
          setEventData(data);
        } catch (error) {
          console.error("Error fetching event data:", error);
        }
      };
      fetchEventData();
    }
  }, [eventId]);

  useEffect(() => {
    const fetchPointVoucher = async () => {
      try {
        const response = await axiosInstance().get(
          `/transactions/point-voucher`
        );
        const { data } = response.data;
        console.log(data);
        setPointVoucher(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchPointVoucher();
  }, []);

  const limit =
    eventData?.max_buy === "one"
      ? 1
      : eventData?.max_buy === "two"
      ? 2
      : eventData?.max_buy === "three"
      ? 3
      : eventData?.max_buy === "four"
      ? 4
      : eventData?.max_buy === "five"
      ? 5
      : 1;

  const increment = () => {
    if (ticketCount < limit) {
      setTicketCount((prevCount) => prevCount + 1);
    }
  };

  const decrement = () => {
    if (ticketCount > 1) {
      setTicketCount((prevCount) => prevCount - 1);
    }
  };
  const ticketPrice = getTicketPrice(eventData) * ticketCount;
  const voucherDiscount = voucher ? ticketPrice * 0.1 : 0;
  let pointDiscount = point ? pointVoucher?.point?.point || 0 : 0;
  if (
    point &&
    pointVoucher?.point?.point &&
    pointVoucher.point.point > ticketPrice
  ) {
    pointDiscount = ticketPrice;
  }

  useEffect(() => {
    setTotalPrice(getTicketPrice(eventData) * ticketCount);
  }, [eventData, ticketCount]);

  const handleVoucherChange = () => {
    setVoucher(!voucher);
    if (!voucher) {
      setPoint(false);
    }
    if (!voucher) {
      setTotalPrice(ticketPrice - ticketPrice * 0.1);
    } else {
      setTotalPrice(ticketPrice);
    }
  };

  const handlePointChange = () => {
    setPoint(!point);
    if (!point) {
      setVoucher(false);
    }
    if (!point) {
      setTotalPrice(ticketPrice - (pointVoucher?.point?.point || 0));
    } else {
      setTotalPrice(ticketPrice);
    }
  };

  const handlePayment = async () => {
    if (ticketCount < 1 || ticketCount > limit) {
      alert("Masukkan jumlah tiket valid");
      return;
    }

    try {
      const response = await axiosInstance().post(`/transactions/${eventId}`, {
        total_ticket: ticketCount,
        voucher: voucher,
        point: point,
      });
      const transactionId = response.data.id;

      console.log("Payment successful:", response.data);

      router.push(`/invoice/${transactionId}`);
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  return (
    <div className="p-10 flex flex-col gap-5">
      <p className="font-semibold text-2xl">Book Your Tickets</p>

      <div className=" flex gap-10 justify-between">
        <div className="flex flex-col gap-5 p-5 rounded-lg border border-gray-300 bg-white w-[750px]">
          {eventData && (
            <>
              <div className="flex gap-10">
                <img
                  src={`${imgSrc}${eventData.id}`}
                  alt={eventData.title}
                  className="rounded-lg object-cover w-72 h-36"
                />
                <div className="flex flex-col gap-3">
                  <p className="text-xl font-semibold">{eventData.title}</p>
                  <p className="flex gap-2 items-center">
                    <img
                      src="https://assets.loket.com/web/assets/img/ic-calender.svg"
                      alt=""
                    />
                    {dayjs(eventData.start_event).format("DD MMMM YYYY")}
                  </p>
                  <p className="flex gap-2 items-center">
                    <img
                      src="https://assets.loket.com/web/assets/img/ic-clock.svg"
                      alt=""
                    />
                    {dayjs(eventData.start_event).format("HH:mm")} -{" "}
                    {dayjs(eventData.end_event).format("HH:mm")} WIB
                  </p>
                  <p className="flex gap-2 items-center">
                    <img
                      src="https://assets.loket.com/web/assets/img/ic-location.svg"
                      alt=""
                    />
                    {eventData.location}, <span>{eventData.city}</span>
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex justify-between gap-2 items-center">
                <p className="font-semibold text-xl">Ticket Details: </p>
                <div className="flex gap-5 items-center">
                  {eventData.promotion ? (
                    <p className="font-semibold text-lg">
                      Rp {formatPrice(eventData.promo_price)}
                    </p>
                  ) : (
                    <p className="font-semibold text-lg">
                      Rp {formatPrice(eventData.ticket_price)}
                    </p>
                  )}

                  <div className="flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white">
                    <button
                      className="text-xl w-8"
                      onClick={decrement}
                      disabled={ticketCount <= 1}
                    >
                      -
                    </button>
                    <div className="w-5 text-center">{ticketCount}</div>
                    <button
                      className="text-xl w-8"
                      onClick={increment}
                      disabled={ticketCount >= limit}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <hr />
              <div className="flex gap-20">
                <div className="flex items-center gap-2">
                  <FaCoins className="text-3xl text-gray-400" />
                  <div className="flex flex-col">
                    <p>
                      My Point: {""}
                      <span>
                        {pointVoucher &&
                          pointVoucher.point &&
                          formatPrice(pointVoucher.point.point)}
                      </span>
                    </p>
                    {pointVoucher && pointVoucher.point.point !== 0 && (
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          id="point"
                          checked={point}
                          onChange={handlePointChange}
                        />
                        <label htmlFor="">use my point</label>
                      </div>
                    )}
                  </div>
                </div>
                {pointVoucher &&
                  pointVoucher.voucher &&
                  !pointVoucher.voucher.isUsed && (
                    <div className="flex items-center gap-2">
                      <MdDiscount className="text-3xl text-gray-400" />
                      <div className="flex flex-col">
                        <p>Get 10% Discount</p>
                        <div className="flex gap-2 items-center">
                          <input
                            type="checkbox"
                            id="voucher"
                            checked={voucher}
                            onChange={handleVoucherChange}
                          />
                          <label htmlFor="">use my voucher</label>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </>
          )}
          {/* <hr /> */}
        </div>
        <div className="flex flex-col gap-5 p-5 rounded-lg border border-gray-300 bg-white w-[400px] h-full">
          <p className="font-semibold text-xl">Price Details</p>
          <div className="flex flex-col gap-2">
            <div className=" flex justify-between">
              <p>Ticket Price</p>
              <p>Rp {formatPrice(ticketPrice)}</p>
            </div>
            {/* Klo pake voucher atau point */}
            {voucher && (
              <div className="flex justify-between">
                <p>Voucher Discount</p>
                <p>- Rp {formatPrice(voucherDiscount)}</p>
              </div>
            )}

            {point && (
              <div className="flex justify-between">
                <p>Point Discount</p>
                <p>- Rp {formatPrice(pointDiscount)}</p>
              </div>
            )}
          </div>
          <hr />
          <div className="flex justify-between font-semibold text-xl">
            <p>Price Total</p>
            <p>Rp {formatPrice(totalPrice)}</p>
          </div>
          <hr />
          {eventId && (
            <button
              className="p-2 rounded-lg bg-blue-700 text-white hover:bg-blue-600"
              onClick={handlePayment}
            >
              Pay Ticket
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Transaction;
