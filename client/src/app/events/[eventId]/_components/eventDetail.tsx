"use client";

import { axiosInstance } from "@/lib/axios";
import { TEvent } from "@/models/event.mode";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";

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

  return (
    <div className="p-16">
      {eventData && (
        <div className="flex flex-col gap-10">
          <div className="flex gap-10">
            <img
              src={`http://localhost:8001/events/image/${eventData.id}`}
              alt=""
              className="w-[700px] h-[350px] object-cover rounded-md"
            />
            <div className="flex flex-col justify-between rounded-md shadow-xl p-5 w-96">
              <div className="flex flex-col gap-3">
                <p className="text-2xl font-semibold">{eventData.title}</p>
                <p>{dayjs(eventData.start_event).format("DD MMMM YYYY")}</p>
                <p>
                  {dayjs(eventData.start_event).format("HH:mm")} -
                  {dayjs(eventData.end_event).format("HH:mm")} WIB
                </p>
                <p>
                  {eventData.location}, <span>{eventData.city}</span>
                </p>
                <p>{eventData.category}</p>
              </div>
              <div className="flex gap-3">
                <img
                  src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/concert-photography/thumbnail.jpeg"
                  alt=""
                  className="rounded-full w-12 h-12 object-cover"
                />
                <div className="flex flex-col">
                  <p className="text-gray-500 text-sm">Hosted by</p>
                  <p className="font-semibol">{eventData.user.name}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="w-[700px] flex flex-col gap-5 py-5">
              <div>
                <p className="font-semibold text-lg">Description</p>
                <p>{eventData.description}</p>
              </div>
              <div>
                <p className="font-semibold text-lg">Terms & Conditions</p>
                <p>{eventData.terms_conditions}</p>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-md shadow-xl p-5 w-96 h-60">
              <p>Ticket {eventData.title}</p>
              <div className="flex justify-between">
                <p>ini input qty</p>
                <p>{eventData.ticket_price}</p>
              </div>
              <div className="flex justify-between">
                <p>Total () ticket</p>
                <p>Rp</p>
              </div>
              <button className="p-2 rounded-md bg-blue-700 text-white">
                Buy Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
