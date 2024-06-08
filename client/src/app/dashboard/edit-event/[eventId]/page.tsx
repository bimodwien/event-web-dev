import React from "react";
import EventEditForm from "../../_components/eventEditForm";
import { axiosInstance } from "../../../../lib/axios";

type Props = { params: { eventId: string } };
const page = async ({ params }: Props) => {
  const { eventId } = params;
  const response = await axiosInstance().get(`/events/${eventId}`);
  const { data } = response.data;
  return (
    <>
      <EventEditForm forEditData={data} />
    </>
  );
};

export default page;
