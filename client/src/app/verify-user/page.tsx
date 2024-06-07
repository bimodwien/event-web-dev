"use client";
import React from "react";
import Logout from "../_components/logout";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <section>
        <h4>You have to verify your email</h4>
        <h5>Please check your email</h5>
        <button>
          <Logout title="back to home" />
        </button>
      </section>
    </>
  );
}
