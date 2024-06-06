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
    <div className="p-5">
      {eventData && (
        <div className="flex flex-col gap-3">
          <img
            src={`http://localhost:8001/events/image/${eventData.id}`}
            alt=""
            className="w-[500px] h-60 object-cover rounded-md"
          />
          <p>{eventData.title}</p>
          <p>{dayjs(eventData.start_event).format("DD MMMM YYYY")}</p>
          <p>
            {eventData.location},{eventData.city}
          </p>
        </div>
      )}
    </div>
  );
}
