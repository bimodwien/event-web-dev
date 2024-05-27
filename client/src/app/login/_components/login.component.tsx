"use client";

import React from "react";

const LoginForm = () => {
  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
          >
            TiketFest
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              <form action="" method="post" className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor=""
                    className="block mb-2 text-md font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Insert your username here..."
                  />
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="block mb-2 text-md font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name=""
                    id=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Insert your password here..."
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      />
                    </div>
                    <div className="ml-3 text-md">
                      <label htmlFor="" className="text-gray-500">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href=""
                    className="text-md font-medium text-primary-600 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500">
                  Don't have an account yet?{" "}
                  <a
                    href=""
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
