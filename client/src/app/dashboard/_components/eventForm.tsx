"use client";

import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import * as Yup from "yup";

const EventForm = () => {
  const [isTypeFree, setTypeFree] = useState(false);

  const imageRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const initialValues = {
    title: "",
    city: "",
    location: "",
    address: "",
    start_event: "",
    end_event: "",
    description: "",
    terms_conditions: "",
    category: "",
    type: "",
    ticket_available: 0,
    ticket_price: 0,
    max_buy: "",
    promotion: "",
    start_promo: "",
    end_promo: "",
    image: null,
    image_url:
      "https://dinkes.dairikab.go.id/wp-content/uploads/sites/12/2022/03/default-img.gif",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      title: Yup.string().required().min(5),
      city: Yup.string().oneOf(["Jakarta", "Bandung", "Surabaya"]).required(),
      location: Yup.string().required(),
      address: Yup.string().required(),
      start_event: Yup.date().required(),
      end_event: Yup.date().required(),
      type: Yup.string().oneOf(["paid", "free"]).required(),
      ticket_available: Yup.number().required(),
      ticket_price: Yup.number().required(),
      description: Yup.string().required(),
      terms_conditions: Yup.string().required(),
      category: Yup.string().oneOf(["Music", "Category", "Sport"]).required(),
      promotion: Yup.string().oneOf([
        "five",
        "ten",
        "fifth_teen",
        "twenty",
        "twenty_five",
        "forty",
        "fifty",
      ]),
      start_promo: Yup.string(),
      end_promo: Yup.string(),
      max_buy: Yup.string()
        .oneOf(["one", "two", "three", "four", "five"])
        .required(),
    }),
    onSubmit: async (values) => {
      try {
        const newEvent = new FormData();
        newEvent.append("title", values.title);
        newEvent.append("city", values.city);
        newEvent.append("location", values.location);
        newEvent.append("address", values.address);
        newEvent.append("start_event", values.start_event);
        newEvent.append("end_event", values.end_event);
        newEvent.append("description", values.description);
        newEvent.append("terms_conditions", values.terms_conditions);
        newEvent.append("category", values.category);
        newEvent.append("type", values.type);
        newEvent.append("ticket_available", values.ticket_available.toString());
        newEvent.append(
          "ticket_price",
          values.type === "free" ? "0" : values.ticket_price.toString()
        );
        newEvent.append("max_buy", values.max_buy);

        if (values.promotion) {
          newEvent.append("promotion", values.promotion);
          newEvent.append("start_promo", values.start_promo);
          newEvent.append("end_promo", values.end_promo);
        }
        if (values.image) newEvent.append("image", values.image);

        console.log(
          "Data yang diinput:",
          Object.fromEntries(newEvent.entries())
        );

        const { data } = await axiosInstance().post("/events/e1", newEvent);
        alert(data.message);
        router.push("dashboard/my-event");
      } catch (error) {
        if (error instanceof AxiosError) alert(error.response?.data?.message);
        else if (error instanceof Error) console.log(error.message);
      }
    },
  });

  return (
    <>
      <section className="bg-gray-50 h-screen w-full">
        <div className="px-10 py-5 flex flex-col gap-3">
          <form id="create-event" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-5">
              <div>
                <input
                  type="file"
                  ref={imageRef}
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      formik.setFieldValue("image", e.target.files[0]);
                      formik.setFieldValue(
                        "image_url",
                        window.URL.createObjectURL(e.target.files[0])
                      );
                    }
                  }}
                />

                <img
                  src={formik.values.image_url}
                  onClick={() => imageRef.current?.click()}
                  alt=""
                  className="w-[600px] h-72 object-cover"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="title"
                  placeholder="Event Title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm md:text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-96 p-2.5"
                  {...formik.getFieldProps("title")}
                  required
                />
              </div>
              <div className="flex gap-2 items-center">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 w-60"
                  {...formik.getFieldProps("category")}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Music">Music</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Sport">Sport</option>
                </select>
              </div>
            </div>
            <hr className="font-bold my-5" />
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p>Date & Time</p>
                <div className="flex gap-5">
                  <div className="flex flex-col w-60">
                    <label htmlFor="start_event">Start</label>
                    <input
                      type="datetime-local"
                      id="start_event"
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      {...formik.getFieldProps("start_event")}
                      required
                    />
                  </div>
                  <div className="flex flex-col w-60">
                    <label htmlFor="end_event">End</label>
                    <input
                      type="datetime-local"
                      id="end_event"
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      {...formik.getFieldProps("end_event")}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p>Location</p>
                <div className="flex gap-5">
                  <div className="flex flex-col w-60">
                    <label htmlFor="city">City</label>
                    <select
                      id="city"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 w-60"
                      {...formik.getFieldProps("city")}
                      required
                    >
                      <option value="">Select a city</option>
                      <option value="Jakarta">JAKARAT</option>
                      <option value="Bandung">Bandung</option>
                      <option value="Surabaya">Surabaya</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-60">
                    <label htmlFor="location">Place</label>
                    <input
                      type="text"
                      id="location"
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      {...formik.getFieldProps("location")}
                      required
                    />
                  </div>
                  <div className="flex flex-col w-60">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      {...formik.getFieldProps("address")}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr className="font-bold my-5" />
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p>Ticket Detail</p>
                <div className="flex items-center gap-5 h-5">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="type"
                      value="paid"
                      id="type_paid"
                      checked={formik.values.type === "paid"}
                      onChange={(e) => {
                        formik.setFieldValue("type", "paid");
                        setTypeFree(false);
                      }}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    />
                    <div>
                      <label htmlFor="type_paid" className="text-md">
                        Paid
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="type"
                      value="free"
                      id="type_free"
                      checked={formik.values.type === "free"}
                      onChange={(e) => {
                        formik.setFieldValue("type", "free");
                        setTypeFree(true);
                      }}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    />
                    <div>
                      <label htmlFor="type_free" className="text-md">
                        Free
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex flex-col w-60">
                    <label htmlFor="">Ticket Quantity</label>
                    <input
                      type="number"
                      id="ticket_available"
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      {...formik.getFieldProps("ticket_available")}
                      required
                    />
                  </div>
                  <div className="flex flex-col w-60">
                    <label htmlFor="max_buy">Limit Buy</label>
                    <select
                      id="max_buy"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 w-60"
                      {...formik.getFieldProps("max_buy")}
                      required
                    >
                      <option value="">Select a limit</option>
                      <option value="one">one</option>
                      <option value="two">two</option>
                      <option value="three">three</option>
                      <option value="four">four</option>
                      <option value="five">five</option>
                    </select>
                  </div>
                  {!isTypeFree && (
                    <div className="flex flex-col w-60">
                      <label htmlFor="">Ticket Price</label>
                      <input
                        type="number"
                        id="ticket_price"
                        placeholder=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        {...formik.getFieldProps("ticket_price")}
                        required
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p>Promotion (optional)</p>
                <div className="flex gap-5">
                  <div className="flex flex-col w-60">
                    <label htmlFor="city">Promotion</label>
                    <select
                      id="promotion"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 w-60"
                      {...formik.getFieldProps("promotion")}
                      required
                    >
                      <option value="">Select a promotion</option>
                      <option value="five">5%</option>
                      <option value="ten">10&</option>
                      <option value="fifth_teen">15%</option>
                      <option value="twenty">20%</option>
                      <option value="twenty_five">25%</option>
                      <option value="forty">40%</option>
                      <option value="fifty">50%</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-60">
                    <label htmlFor="">Start</label>
                    <input
                      type="date"
                      id="start_promo"
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      {...formik.getFieldProps("start_promo")}
                    />
                  </div>
                  <div className="flex flex-col w-60">
                    <label htmlFor="">End</label>
                    <input
                      type="date"
                      id="end_promo"
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      {...formik.getFieldProps("end_promo")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr className="font-bold my-5" />
            <div className="flex flex-col gap-5">
              <div className="flex flex-col w-full">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  placeholder="Enter description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  rows={10}
                  {...formik.getFieldProps("description")}
                  required
                ></textarea>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="description">Terms & Conditions</label>
                <textarea
                  id="terms_conditions"
                  placeholder="Enter T&C"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  rows={10}
                  {...formik.getFieldProps("terms_conditions")}
                  required
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an event
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default EventForm;
