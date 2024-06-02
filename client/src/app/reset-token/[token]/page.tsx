"use client";

import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import YupPassword from "yup-password";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";

type Props = { params: { token: string } };

function ResetToken({ params }: Props) {
  console.log("<><><><><>");
  const router = useRouter();

  YupPassword(Yup);
  const initialValues = {
    password: "",
  };

  console.log("haii");

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      password: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      await axiosInstance().post(`/users/v6`, values, {
        headers: {
          Authorization: "Bearer " + params.token,
        },
      });
      console.log(values);
      router.push("/login");
    },
  });

  console.log("formik", formik);
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
                Reset your password
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
                    Your Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounder-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Insert your password here..."
                    {...formik.getFieldProps("password")}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResetToken;
