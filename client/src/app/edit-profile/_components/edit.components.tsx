"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import React from "react";

type Props = {};

const EditComponent = (props: Props) => {
  const user = useAppSelector((state) => state.auth);

  return (
    <>
      <div>EditComponent</div>
    </>
  );
};

export default EditComponent;
