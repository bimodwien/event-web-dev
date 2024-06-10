"use client";
import React, { useState } from "react";
import YupPassword from "yup-password";
import * as Yup from "yup";
import { useFormik } from "formik";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ComponentRegister = () => {
  const router = useRouter();
  const [isEventOrganizer, setEventOrganizer] = useState(false);

  YupPassword(Yup);
  const initialValues = {
    email: "",
    username: "",
    name: "",
    password: "",
    role: "",
    referenceCode: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email("Invalid email format"),
      username: Yup.string().required(),
      name: Yup.string().required(),
      password: Yup.string().required(),
      role: Yup.string().required(),
      referenceCode: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        await axiosInstance().post("/users/v1", values);
        alert("User berhasil Register");
        router.push("/login");
      } catch (error) {
        console.log(error);
        const respBody = (error as any).request.responseText;
        try {
          const respJson = JSON.parse(respBody);
          alert(`User gagal Register - ${respJson.error}`);
          return;
        } catch (e) {}
        alert(`User gagal Register - ${(error as any).message}`);
      }
    },
  });

  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
          >
            TiketFest
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
              </h1>
              <form
                onSubmit={formik.handleSubmit}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor=""
                    className="block mb-2 text-md font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Insert Your Email Here..."
                    {...formik.getFieldProps("email")}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="block mb-2 text-md font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Insert your username here..."
                    {...formik.getFieldProps("username")}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="block mb-2 text-md font-medium text-gray-900"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Insert your full name here..."
                    {...formik.getFieldProps("name")}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="block mb-2 text-md font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Insert your password here..."
                    {...formik.getFieldProps("password")}
                    required
                  />
                </div>
                {!isEventOrganizer && (
                  <div>
                    <label
                      htmlFor=""
                      className="block mb-2 text-md font-medium text-gray-900"
                    >
                      Reference Code
                    </label>
                    <input
                      type="text"
                      id="referenceCode"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Insert your reference Code here..."
                      {...formik.getFieldProps("referenceCode")}
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor=""
                    className="block mb-2 text-md font-medium text-gray-900"
                  >
                    Role
                  </label>
                  <div className="flex items-start">
                    <div className="flex items-center gap-5 h-5">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="role"
                          value="eventOrganizer"
                          checked={formik.values.role === "eventOrganizer"}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            formik.setFieldValue(
                              "role",
                              isChecked ? "eventOrganizer" : ""
                            );
                            setEventOrganizer(isChecked);
                          }}
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        />
                        <div>
                          <label htmlFor="" className="text-md">
                            Event Organizer
                          </label>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="customer"
                          value="customer"
                          checked={formik.values.role === "customer"}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            formik.setFieldValue(
                              "role",
                              isChecked ? "customer" : ""
                            );
                            setEventOrganizer(false);
                          }}
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        />
                        <div>
                          <label htmlFor="" className="text-md">
                            Customer
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500">
                  Already have an account?{" "}
                  <Link
                    href={"/login"}
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ComponentRegister;
