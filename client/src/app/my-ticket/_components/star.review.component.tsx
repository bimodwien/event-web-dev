"use client";
import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa6";

const StarComponent = ({
  star,
  index,
  handleClickStars,
}: {
  star: any;
  index: any;
  handleClickStars: any;
}) => {
  return (
    <>
      <div
        key={index}
        onClick={() => handleClickStars(index)}
        style={{ cursor: "pointer" }}
      >
        {star ? <FaStar /> : <FaRegStar />}
      </div>
    </>
  );
};

export default StarComponent;
