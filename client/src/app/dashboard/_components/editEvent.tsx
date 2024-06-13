"use client";

import { imgSrc } from "@/app/_components/format";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";

const EventEditForm = () => {
  const [isTypeFree, setTypeFree] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { eventId } = useParams();
  const [imagePreview, setImagePreview] = useState<string>("");

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
    image: "",
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
      //   type: Yup.string().oneOf(["paid", "free"]).required(),
      ticket_available: Yup.number().required(),
      ticket_price: Yup.number().required(),
      description: Yup.string().required(),
      terms_conditions: Yup.string().required(),
      category: Yup.string().oneOf(["Music", "Workshop", "Sport"]).required(),
      promotion: Yup.string().oneOf([
        "five",
        "ten",
        "fifth_teen",
        "twenty",
        "twenty_five",
        "forty",
        "fifty",
      ]),
      start_promo: Yup.date(),
      end_promo: Yup.date(),
      max_buy: Yup.string()
        .oneOf(["one", "two", "three", "four", "five"])
        .required(),
    }),
    onSubmit: async (values) => {
      try {
        // console.log("form values:", values);

        const editEvent = new FormData();
        editEvent.append("title", values.title);
        editEvent.append("city", values.city);
        editEvent.append("location", values.location);
        editEvent.append("address", values.address);
        editEvent.append("start_event", values.start_event);
        editEvent.append("end_event", values.end_event);
        editEvent.append("description", values.description);
        editEvent.append("terms_conditions", values.terms_conditions);
        editEvent.append("category", values.category);
        editEvent.append("type", values.type);
        editEvent.append(
          "ticket_available",
          values.ticket_available.toString()
        );
        editEvent.append("max_buy", values.max_buy);

        if (values.type !== "free") {
          editEvent.append("ticket_price", values.ticket_price.toString());
          if (values.promotion) {
            editEvent.append("promotion", values.promotion);
            editEvent.append("start_promo", values.start_promo);
            editEvent.append("end_promo", values.end_promo);
          }
        }

        if (values.image !== `${imgSrc}${eventId}`) {
          editEvent.append("image", values.image);
        }

        editEvent.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });

        // console.log(
        //   "Data yang diinput:",
        //   Object.fromEntries(editEvent.entries())
        // );

        await axiosInstance().patch(`/events/${eventId}`, editEvent);
        router.push(`/dashboard/my-event/${eventId}`);
      } catch (error) {
        if (error instanceof AxiosError) alert(error.response?.data?.message);
        else if (error instanceof Error) console.log(error.message);
      }
    },
  });

  useEffect(() => {
    setTypeFree(formik.values.type === "free");
  }, [formik.values.type]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axiosInstance().get(`/events/${eventId}`);
        const event = response.data.data;
        console.log("Fetched event data:", event);

        if (event.id) {
          formik.setValues({
            image: `${imgSrc}${event.id}`,
            title: event.title,
            description: event.description,
            terms_conditions: event.terms_conditions,
            location: event.location,
            address: event.address,
            city: event.city,
            start_event: event.start_event,
            end_event: event.end_event,
            category: event.category,
            type: event.type,
            ticket_available: event.ticket_available,
            ticket_price: event.ticket_price,
            max_buy: event.max_buy,
            promotion: event.promotion || "",
            start_promo: event.start_promo || "",
            end_promo: event.end_promo || "",
          });
        }
        setImagePreview(`${imgSrc}${event.id}`);

        console.log(event.image);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files && e.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("image", file);

      const img_url = URL.createObjectURL(file);

      setImagePreview(img_url);
    }
  };

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
                  onChange={handleFileChange}
                />

                <img
                  src={imagePreview}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
              </div>
              <div className="flex gap-2 items-center">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 w-60"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.start_event
                          ? new Date(formik.values.start_event)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                    />
                  </div>
                  <div className="flex flex-col w-60">
                    <label htmlFor="end_event">End</label>
                    <input
                      type="datetime-local"
                      id="end_event"
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.end_event
                          ? new Date(formik.values.end_event)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.city}
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.location}
                    />
                  </div>
                  <div className="flex flex-col w-60">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.address}
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
                      onBlur={formik.handleBlur}
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
                      onBlur={formik.handleBlur}
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.ticket_available}
                    />
                  </div>
                  <div className="flex flex-col w-60">
                    <label htmlFor="max_buy">Limit Buy</label>
                    <select
                      id="max_buy"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 w-60"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.max_buy}
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ticket_price}
                      />
                    </div>
                  )}
                </div>
              </div>
              {!isTypeFree && (
                <div className="flex flex-col gap-2">
                  <p>Promotion (optional)</p>
                  <div className="flex gap-5">
                    <div className="flex flex-col w-60">
                      <label htmlFor="city">Promotion</label>
                      <select
                        id="promotion"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 w-60"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.promotion}
                      >
                        <option value="">Select a promotion</option>
                        <option value="five">5%</option>
                        <option value="ten">10%</option>
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={formik.values.type === "FREE"}
                        value={
                          formik.values.start_promo
                            ? new Date(formik.values.start_promo)
                                .toISOString()
                                .slice(0, 10)
                            : ""
                        }
                      />
                    </div>
                    <div className="flex flex-col w-60">
                      <label htmlFor="">End</label>
                      <input
                        type="date"
                        id="end_promo"
                        placeholder=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formik.values.end_promo
                            ? new Date(formik.values.end_promo)
                                .toISOString()
                                .slice(0, 10)
                            : ""
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                ></textarea>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="description">Terms & Conditions</label>
                <textarea
                  id="terms_conditions"
                  placeholder="Enter T&C"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  rows={10}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.terms_conditions}
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

export default EventEditForm;
