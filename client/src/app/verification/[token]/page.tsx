"use server";

import { axiosInstance } from "@/lib/axios";
import { redirect } from "next/navigation";

type Props = { params: { token: string } };

const Verification = ({ params }: Props) => {
  const verified = async () => {
    "use server";
    let isError = false;

    await axiosInstance()
      .patch(
        `/users/v4`,
        {},
        {
          headers: {
            Authorization: "Bearer " + params.token,
          },
        }
      )
      .then(() => {})
      .catch(() => {
        isError = true;
      });
    if (!isError) redirect("/");
  };

  return (
    <>
      <div>Hello, Thanks for using Our Service</div>
      <div>
        Please verify your account{" "}
        <form action={verified}>
          <button type="submit">here</button>
        </form>
      </div>
    </>
  );
};

export default Verification;
