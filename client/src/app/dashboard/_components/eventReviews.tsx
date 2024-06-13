"use client";

import React, { useEffect } from "react";

import { axiosInstance } from "@/lib/axios";

type Props = {};

const EventReviews = (props: Props) => {
  async function fetchingReview() {
    try {
      const response = await axiosInstance().get("/reviews/yours");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    try {
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div>EventReview</div>
    </>
  );
};

export default EventReviews;
