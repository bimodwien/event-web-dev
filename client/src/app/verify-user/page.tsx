"use client";
import React from "react";
import Logout from "../_components/logout";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <section className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            You have to verify your email
          </h4>
          <h5 className="mb-3 font-normal text-gray-700">
            Please check your email
          </h5>
          <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <Logout title="back to home" />
          </div>
        </section>
      </div>
    </>
  );
}
