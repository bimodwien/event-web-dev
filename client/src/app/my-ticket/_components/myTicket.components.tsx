"use client";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../lib/axios";
// import { useAppSelector } from "../../../lib/redux/hooks";

type Props = {};

const MyTicketComponent = (props: Props) => {
  const [myTransaction, setMyTransaction] = useState([]);
  //   const user = useAppSelector((state) => state.auth);

  async function fetchMyTicket() {
    console.log("try fetching");

    const response = await axiosInstance().get("/transactions/customer");
    console.log("setelah axios");
    const { data } = response.data;

    console.log(response);
    console.log(data);

    setMyTransaction(data);
  }

  useEffect(() => {
    fetchMyTicket();
  }, []);
  return (
    <>
      {myTransaction.map((e, i) => {
        <div key={i}>test</div>;
      })}
      <div></div>
    </>
  );
};

export default MyTicketComponent;
