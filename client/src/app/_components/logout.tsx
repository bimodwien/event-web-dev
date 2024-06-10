"use client";
import { useAppDispatch } from "@/lib/redux/hooks";
import { logout } from "@/lib/redux/slices/user.slice";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const Logout = ({ title }: { title: string }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  function loggingout() {
    dispatch(logout());
    router.push("/login");
  }
  return (
    <>
      <button
        onClick={() => {
          loggingout();
        }}
      >
        {title}
      </button>
    </>
  );
};

export default Logout;
