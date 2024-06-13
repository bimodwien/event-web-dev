"use client";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../lib/axios";

import EventReview from "./event.review";

type Props = {};

const MyTicketComponent = (props: Props) => {
  const [myTransaction, setMyTransaction] = useState<any[]>([]);

  async function fetchMyTicket() {
    try {
      const response = await axiosInstance().get("/transactions/yours");
      const { data } = response.data;
      setMyTransaction(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchMyTicket();
    console.log("ini event nya", myTransaction);
  }, []);

  return (
    <>
      <section className="bg-gray-50 h-screen">
        {myTransaction.map((eve) => {
          return <EventReview key={eve.id} event={eve} />;
        })}
      </section>
    </>
  );
};

export default MyTicketComponent;
