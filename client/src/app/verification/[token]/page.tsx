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
      <section className="flex h-screen justify-center items-center">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            Hello, Thanks for using Our Service
          </h5>
          <p className="mb-3 font-normal text-gray-700">
            Please verify your accounts
          </p>
          <form action={verified}>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-80 sm:w-auto px-5 py-2.5 text-center"
            >
              here
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Verification;
