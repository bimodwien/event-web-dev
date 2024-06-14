"use client";
import React, { useEffect, useState } from "react";

import { Button } from "flowbite-react";
import StarComponent from "./star.review.component";
import { axiosInstance } from "../../../lib/axios";
import YupPassword from "yup-password";
import * as Yup from "yup";
import { useFormik } from "formik";
import { imgSrc } from "@/app/_components/format";

const EventReview = ({ event }: { event: any }) => {
  const [stars, setStars] = useState([false, false, false, false, false]);

  YupPassword(Yup);
  const initialValues = {
    rating: 0,
    review_text: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      review_text: Yup.string(),
      rating: Yup.number(),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values, "ini adalah valuenya");
        await axiosInstance().post(`/reviews/${event.event.id}`, values);
        alert("Review berhasil ditambahkan");
      } catch (error) {
        console.log(error);
      }
    },
  });

  function handleClickStars(index: number) {
    const newStar = stars.map((_, i) => i <= index);
    setStars(newStar);
    const newRating = newStar.reduce((acc, star) => acc + (star ? 1 : 0), 0);
    formik.setFieldValue("rating", newRating);
  }

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);
  return (
    <>
      <div
        key={event.id}
        className="flex items-center justify-center py-10 w-full"
      >
        <div className="bg-white flex gap-10 justify-between border border-gray-300 items-center py-10 px-10 rounded-lg shadow-md w-3/4">
          <div className="">
            <img
              className=""
              src={`${imgSrc}${event.event.id}`}
              alt={event.title}
            />
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-between gap-3 w-full h-auto"
          >
            <div className="text-3xl font-medium text-gray-900 ">
              {event.event.title}
            </div>
            <div>total ({event.total_ticket}) ticket </div>
            <div>
              {event.event.location}, {event.event.city}
            </div>
            <div>{event.event.address}</div>
            <div className="flex gap-3 text-4xl font-medium text-yellow-200">
              {stars.map((star, index) => (
                <StarComponent
                  star={star}
                  index={index}
                  handleClickStars={handleClickStars}
                />
              ))}
            </div>
            <div className="w-full">
              <textarea
                rows={5}
                cols={35}
                id="rating"
                {...formik.getFieldProps("review_text")}
              ></textarea>
            </div>
            <div className="flex">
              <Button type="submit" gradientMonochrome="cyan">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default EventReview;
