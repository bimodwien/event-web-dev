"use server";

import { axiosInstance } from "@/lib/axios";
import { url } from "inspector";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { NextResponse } from "next/server";

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

    //   .then((res) => {
    //     redirect("/", RedirectType.replace);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <>
      <div>Hello, Thanks for using Our Service</div>
      <div>
        Please verify your account{" "}
        {/* <Link href={`http://localhost:8001/users/v4/${params.token}`}> */}
        <form action={verified}>
          <button type="submit">here</button>
        </form>
        {/* </Link> */}
      </div>
    </>
  );
};

export default Verification;
