"use client";

import { axiosInstance } from "@/lib/axios";
import { TEvent } from "@/models/event.mode";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

const EventCard = () => {
  dayjs.extend(relativeTime);
  const [eventData, setEventData] = useState<any[]>([]);

  const fetchEventData = async () => {
    try {
      const response = await axiosInstance().get("/events/");
      const { data } = response.data;
      setEventData(data);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-ID");
  };

  return (
    <div className="grid grid-cols-4 gap-5 p-10">
      {eventData?.map((event) => (
        <Link
          href={`events/${event.id}`}
          key={event.id}
          className="flex flex-col rounded-lg w-60 overflow-hidden shadow"
        >
          <img
            src={`http://localhost:8001/events/image/${event.id}`}
            alt=""
            className="w-full h-36 object-cover"
          />
          <div className="flex flex-col gap-2 py-2 px-4">
            <p className="text-base font-semibold">{event.title}</p>
            <p className="text-gray-400 text-sm">
              {/* {event.start_event.toLocaleString()} */}
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

            <hr className="mt-5" />
            <div className="flex gap-2 items-center">
              <img
                src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/concert-photography/thumbnail.jpeg"
                alt=""
                className="rounded-full w-8 h-8 object-cover"
              />
              <p>{event.user.username}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EventCard;
