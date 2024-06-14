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
      <section className="bg-gray-50 h-screen p-10">
        <p className="text-2xl font-semibold text-center">All Ticket History</p>
        <div className="flex flex-col gap-5 p-5">
          {myTransaction
            .filter((eve) => eve.status === "paid")
            .map((eve) => {
              return <EventReview key={eve.id} event={eve} />;
            })}
        </div>
      </section>
    </>
  );
};

export default MyTicketComponent;
