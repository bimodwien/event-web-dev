"use client";
import React, { useEffect, useState } from "react";
import { TEvent } from "../../../models/event.mode";
import { Button } from "flowbite-react";
import { axiosInstance } from "../../../lib/axios";
import { useRouter } from "next/navigation";
import { FaStar, FaRegStar } from "react-icons/fa6";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

type Props = { eventData: TEvent };

const EventDetailEO = ({ eventData }: Props) => {
  dayjs.extend(relativeTime);

  // const [reviews, setReviews] = useState<any[]>([]);
  const [views, setViews] = useState<any[]>([]);

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

  async function fetchReview() {
    try {
      const res = await axiosInstance().get(`/reviews/${eventData.id}`);
      console.log(res.data, "ini res.data");
      const { response } = res.data;
      console.log(response, "ini response");
      // setReviews(response);
      setViews(response);
      console.log(views, "ini views");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchReview();
  }, []);

  // useEffect(() => {
  //   console.log(views, "ini console log di useefect");
  // }, [views]);
  return (
    <>
      <div className="p-5">
        {eventData && (
          <div className="flex flex-col gap-3">
            <img
              src={`http://localhost:8001/events/image/${eventData.id}`}
              alt=""
              className="w-[1080px] h-[480px] object-cover rounded-md"
            />
            <p className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
              {eventData.title}
            </p>
            <p className="text-base text-gray-500 sm:text-lg sm:max-w-xl sm:mx-auto md:text-xl lg:mx-0">
              {dayjs(eventData.start_event).format("DD MMMM YYYY")}
            </p>
            <p className="text-base text-gray-500 sm:text-lg sm:max-w-xl sm:mx-auto md:text-xl lg:mx-0">
              {eventData.location}, {eventData.city}
            </p>

            <div className="flex gap-3 pt-5">
              <Button gradientMonochrome="teal">
                <Link href={`/dashboard/edit-event/${eventData.id}`}>Edit</Link>
              </Button>

              <Button
                gradientMonochrome="failure"
                onClick={() => {
                  handleDelete(eventData.id);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* {views.map((review) => {
        return <div key={review.id}>{review.text}</div>;
      })} */}

      <div className="px-5">
        <h1 className="py-3 font-bold text-4xl">Reviews</h1>
        <div className="flex flex-col justify-between gap-2 rounded-lg shadow-md p-5 w-full bg-white">
          <div className="font-semibold text-xl">Liradiy</div>
          <div className="flex gap-3 text-yellow-200 text-2xl">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
          </div>
          <div>Baguuuusss</div>
        </div>
      </div>
    </>
  );
};

export default EventDetailEO;
