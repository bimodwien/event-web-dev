"use client";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../lib/axios";
import { TTransaction } from "../../../models/transaction.model";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { Button } from "flowbite-react";
import YupPassword from "yup-password";
import * as Yup from "yup";
import { useFormik } from "formik";

type Props = {};

const MyTicketComponent = (props: Props) => {
  const [myTransaction, setMyTransaction] = useState<TTransaction>();
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
        await axiosInstance().post(`/review/${myTransaction?.id}`);
        alert("Review berhasil ditambahkan");
      } catch (error) {
        console.log(error);
      }
    },
  });

  async function fetchMyTicket() {
    console.log("try fetching");

    await axiosInstance()
      .get("/transactions/customer")
      .then((res) => {
        console.log(res);

        const { data } = res.data;
        console.log("setelah axios");
        console.log(data);

        setMyTransaction(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchMyTicket();
  }, []);

  function handleClickStars(index: number) {
    const newStar = stars.map((_, i) => i <= index);
    setStars(newStar);
    const newRating = newStar.reduce((acc, star) => acc + (star ? 1 : 0), 0);
    formik.setFieldValue("rating", newRating);
  }

  return (
    <>
      <section className="bg-gray-50 h-screen">
        <div className="flex items-center justify-center py-10 w-full">
          <div className="bg-white flex gap-10 justify-between items-center py-10 px-10 rounded-lg shadow-md w-3/4">
            <div className="">
              <img
                className=""
                src="https://cdn.antaranews.com/cache/1200x800/2017/12/paramore-square.jpg.webp"
                alt="paramore"
              />
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col justify-between gap-3 w-full h-auto"
            >
              <div className="text-3xl font-medium text-gray-900 ">Title</div>
              <div className="flex gap-3 text-4xl font-medium text-yellow-200">
                {stars.map((star, index) => (
                  <div
                    key={index}
                    onClick={() => handleClickStars(index)}
                    style={{ cursor: "pointer" }}
                  >
                    {star ? <FaStar /> : <FaRegStar />}
                  </div>
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
                <Button gradientMonochrome="cyan">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyTicketComponent;
