"use client";
import React from "react";
import { TEvent } from "../../../models/event.mode";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { axiosInstance } from "../../../lib/axios";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

type Props = { eventData: TEvent };

const EventDetailEO = ({ eventData }: Props) => {
  dayjs.extend(relativeTime);

  const router = useRouter();

  async function handleDelete(id: string) {
    try {
      await axiosInstance().delete(`/events/${id}`);
      alert("data berhasil dihapus");
      router.push("/dashboard/my-event");
    } catch (error) {
      console.log("gagal delete");
    }
  }
  return (
    <>
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
            <Link href={`/dashboard/edit-event/${eventData.id}`}>
              <FiEdit />
            </Link>

            <button
              onClick={() => {
                handleDelete(eventData.id);
              }}
            >
              <FiTrash2 />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default EventDetailEO;
