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
      // console.log(views, "ini views");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchReview();
  }, []);

  useEffect(() => {
    console.log(views, "ini console log di useefect");
  }, [views]);

  function renderStars(rating: number) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }
    return stars;
  }

  return (
    <>
      <div className="p-5">
        {eventData && (
          <div className="flex flex-col gap-3">
            <img
              src={`http://localhost:8001/events/image/${eventData.id}`}
              alt=""
              className="w-[600px] h-60 object-cover rounded-md"
            />
            <p className="text-2xl tracking-tight font-extrabold text-gray-800 sm:text-3xl md:text-4xl">
              {eventData.title}
            </p>
            <p className="text-base text-gray-500 sm:text-lg sm:max-w-xl sm:mx-auto md:text-xl lg:mx-0">
              {dayjs(eventData.start_event).format("DD MMMM YYYY")}
            </p>
            <p className="text-base text-gray-500 sm:text-lg sm:max-w-xl sm:mx-auto md:text-xl lg:mx-0">
              {eventData.location}, {eventData.city}
            </p>

            <div>
              <Link
                href={`/dashboard/transaction/${eventData.id}`}
                className="p-2 bg-blue-500 text-white text-lg"
              >
                See Transactions Event
              </Link>
            </div>

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
      {views.map((review) => {
        return (
          <div
            key={review.id}
            className="flex flex-col justify-between gap-2 rounded-lg shadow-md p-5 w-full bg-white"
          >
            <div className="font-semibold text-xl">{review.user.name}</div>
            <div className="flex gap-3 text-yellow-200 text-2xl">
              {renderStars(review.rating)}
            </div>
            <div>{review.review_text}</div>
          </div>
        );
      })}
    </>
  );
};

export default EventDetailEO;
