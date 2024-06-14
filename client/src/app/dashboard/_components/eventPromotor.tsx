"use client";

import { axiosInstance } from "@/lib/axios";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { formatPrice, imgSrc } from "@/app/_components/format";

const EventPromotor = () => {
  dayjs.extend(relativeTime);
  const [eventData, setEventData] = useState<any[]>([]);

  const fetchEventData = async () => {
    try {
      const response = await axiosInstance().get("/events/yours");
      const { data } = response.data;
      setEventData(data);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  useEffect(() => {
    fetchEventData();
    console.log("ini adalah event data", eventData);
  }, []);

  return (
    <div className="max-w-screen-2xl w-full flex flex-wrap gap-5 py-5 justify-center">
      {eventData?.map((event) => (
        <Link
          href={`/dashboard/my-event/${event.id}`}
          key={event.id}
          className="flex md:flex-col md:justify-between rounded-lg w-full md:w-56 overflow-hidden shadow bg-white"
        >
          <img
            src={`${imgSrc}${event.id}`}
            alt=""
            className="w-full h-36 object-cover"
          />
          <div className="flex flex-col gap-2 py-2 px-4">
            <p className="text-sm">{event.title}</p>
            <p className="text-gray-400 text-sm">
              {dayjs(event.start_event).format("DD MMMM YYYY")}
            </p>
            {event.type === "free" ? (
              <p className="font-semibold text-sm">Free</p>
            ) : (
              <>
                {event.promotion ? (
                  <p className="font-semibold text-sm">
                    Rp {formatPrice(event.promo_price)}
                  </p>
                ) : (
                  <p className="font-semibold text-sm">
                    Rp {formatPrice(event.ticket_price)}
                  </p>
                )}
              </>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EventPromotor;
