"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { Avatar } from "flowbite-react";
import YupPassword from "yup-password";
import * as Yup from "yup";
import { useFormik } from "formik";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { TUser } from "../../../models/user.model";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "@/lib/redux/slices/user.slice";

const EditComponent = () => {
  const user = useAppSelector((state) => state.auth);
  const router = useRouter();

  const imageProf = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const dispatch = useDispatch();
  YupPassword(Yup);
  const initialValues = {
    imageProfile: user.imageProfile,
    name: user.name,
    address: user.address,
    phone: user.phone,
    gender: user.gender,
  } as TUser;

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string(),
      phone: Yup.string(),
      gender: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        await axiosInstance().put("users/v7", values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
        const token = getCookie("access_token");
        if (token) {
          const decode = jwtDecode(token) as { user: TUser };
          dispatch(login(decode.user));
        }

        alert("User berhasil edit data");
        router.push("/");
      } catch (error) {
        alert(error);
      }
    },
  });

  useEffect(() => {
    if (user.id)
      formik.setValues({
        imageProfile: user.imageProfile,
        name: user.name,
        address: user.address,
        phone: user.phone,
        gender: user.gender,
      });
    console.log(user, "mana ");
  }, [user]);

  function handleChangeImage() {
    if (imageProf.current?.files && imageProf.current?.files[0]) {
      const file = imageProf.current.files[0];
      setImagePreview(URL.createObjectURL(file));
      formik.setFieldValue("imageProfile", file);
      console.log("file selected", file);
      console.log("image profile", URL.createObjectURL(file));
    }
  }

  console.log("ini user image profile", user.imageProfile);
  console.log("ini image preview", imagePreview);

  const imageUrl = user.avatarUrl
    ? `http://localhost:8001/users/avatar/${user.avatarUrl}`
    : String(imagePreview);

  return (
    <>
      <section className="bg-gray-50 p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-white p-4 md:p-8 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
            Account Information
          </h2>

          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center gap-5 mb-4 md:mb-6">
              <Avatar size="lg" rounded img={imageUrl ? imageUrl : undefined} />
              <div className="w-full">
                <label
                  htmlFor="your-imageProfile"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Upload file
                </label>
                <input
                  type="file"
                  id="your-imageProfile"
                  ref={imageProf}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                  onChange={() => handleChangeImage()}
                />
              </div>
            </div>

            <div className="mx-auto">
              <div className="mb-5">
                <label
                  htmlFor="your-name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="your-name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  {...formik.getFieldProps("name")}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="your-address"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="ypur-address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  {...formik.getFieldProps("address")}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="your-phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="your-phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  {...formik.getFieldProps("phone")}
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="your-gender"
                  className="block mb-3 text-sm font-medium text-gray-900"
                >
                  Gender
                </label>
                <div className="flex gap-8">
                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      checked={formik.values.gender === "male"}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        formik.setFieldValue("gender", isChecked ? "male" : "");
                      }}
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                    />
                    <label
                      htmlFor="male"
                      className="block ms-2 text-sm font-medium text-gray-900"
                    >
                      Male
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      checked={formik.values.gender === "female"}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        formik.setFieldValue(
                          "gender",
                          isChecked ? "female" : ""
                        );
                      }}
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                    />
                    <label
                      htmlFor="female"
                      className="block ms-2 text-sm font-medium text-gray-900"
                    >
                      Female
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="referral-code"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Referral Code
                </label>
                <input
                  type="text"
                  id="referral-code"
                  aria-label="referral-code"
                  value={user.referralCode}
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
                  disabled
                  readOnly
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditComponent;
