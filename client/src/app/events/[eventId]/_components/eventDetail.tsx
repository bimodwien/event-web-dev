"use client";

import { axiosInstance } from "@/lib/axios";
import { TEvent } from "@/models/event.mode";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import { BiSolidCategoryAlt } from "react-icons/bi";

export default function EventDetails() {
  dayjs.extend(relativeTime);

  const params = useParams();
  const { eventId } = params;

  const [eventData, setEventData] = useState<TEvent>();

  useEffect(() => {
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
  }, [eventId]);

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-ID");
  };

  return (
    <div className="p-16">
      {eventData && (
        <div className="flex flex-col gap-10">
          <div className="flex gap-10">
            <img
              src={`http://localhost:8001/events/image/${eventData.id}`}
              alt=""
              className="w-[750px] h-[350px] object-cover rounded-lg"
            />
            <div className="flex flex-col justify-between rounded-lg shadow-md p-5 w-96 bg-white">
              <div className="flex flex-col gap-3">
                <p className="text-2xl font-semibold">{eventData.title}</p>
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
                <p className="flex gap-2 items-center">
                  <BiSolidCategoryAlt className="text-gray-400" />
                  {eventData.category}
                </p>
              </div>
              <div>
                <hr className="py-2" />
                <div className="flex gap-3">
                  <img
                    src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/concert-photography/thumbnail.jpeg"
                    alt=""
                    className="rounded-full w-12 h-12 object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="text-gray-500 text-sm">Hosted by</p>
                    <p className="font-semibold text-lg">
                      {eventData.user.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-5 rounded-lg shadow-md p-5 w-[750px] bg-white">
              <div>
                <p className="font-semibold text-xl">Description</p>
                <p className="py-2">{eventData.description}</p>
              </div>
              <div>
                <p className="font-semibold text-xl">Terms & Conditions</p>
                <p className="py-2">{eventData.terms_conditions}</p>
              </div>
            </div>
            <div className="flex flex-col justify-between sticky top-28 rounded-lg shadow-md p-5 w-96 h-60 bg-white">
              <p className="font-semibold">Ticket: {eventData.title}</p>
              <div className="flex justify-between">
                <p>
                  {eventData.ticket_available} <span>left</span>
                </p>
                <p className="font-semibold">
                  {" "}
                  Rp {formatPrice(eventData.ticket_price)}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Total () ticket</p>
                <p>Rp</p>
              </div>
              <button className="p-2 rounded-lg bg-blue-700 text-white">
                Buy Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
