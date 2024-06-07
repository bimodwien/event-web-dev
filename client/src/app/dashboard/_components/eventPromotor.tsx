"use client";

import { axiosInstance } from "@/lib/axios";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

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
    <div className="grid grid-cols-3 gap-5 p-10">
      {eventData?.map((event) => (
        <Link
          href={`/dashboard/my-event/${event.id}`}
          key={event.id}
          className="flex flex-col rounded-lg w-60 overflow-hidden shadow"
        >
          <img
            src={`http://localhost:8001/events/image/${event.id}`}
            alt=""
            className="w-full h-36 object-cover"
          />
          <div className="flex flex-col gap-2 py-2 px-4">
            <p className="text-sm">{event.title}</p>
            <p className="text-gray-400 text-sm">
              {dayjs(event.start_event).format("DD MMMM YYYY")}
            </p>
            <p className="font-semibold text-sm">
              Rp. {Number(event.ticket_price).toLocaleString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EventPromotor;
