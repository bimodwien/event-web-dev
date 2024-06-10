import { axiosInstance } from "@/lib/axios";
import EventDetailEO from "../../../dashboard/_components/eventDetailEO";
import React from "react";

type Props = { params: { eventId: string } };

const page = async ({ params }: Props) => {
  const { eventId } = params;
  const response = await axiosInstance().get(`/events/${eventId}`);
  const { data } = response.data;
  return (
    <>
      <EventDetailEO eventData={data} />
    </>
  );
};

export default page;
