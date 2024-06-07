"use client";

import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Logout from "./logout";
import { IoAdd } from "react-icons/io5";
import Link from "next/link";
import { useAppSelector } from "@/lib/redux/hooks";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userPhotoRef = useRef<HTMLButtonElement>(null);

  const user = useAppSelector((state) => state.auth);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      userPhotoRef.current &&
      !userPhotoRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0">
      <div className="max-w-screen flex flex-wrap items-center justify-between mx-5 md:mx-10 py-5">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            TiketFest
          </span>
        </a>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto "
          id="navbar-user"
        >
          <form className="w-[400px] relative">
            <div className="relative">
              <input
                type="search"
                placeholder="search event here"
                className="w-full h-10 p-4 rounded-full bg-slate-800 text-sm text-white"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-slate-600 text-white rounded-full">
                <AiOutlineSearch />
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center gap-2 ">
          <a
            href="/dashboard/create-event"
            className="text-white hidden md:flex gap-1 items-center bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded-full text-sm"
          >
            <IoAdd className="text-lg" />
            Add Event
          </a>
          <button
            ref={userPhotoRef}
            type="button"
            onClick={toggleDropdown}
            className="flex text-sm bg-gray-800 rounded-full border-gray-600 border-4"
            id="user-menu-button"
            aria-expanded={isDropdownOpen ? "true" : "false"}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src={`http://localhost:8001/users/avatar/${user.avatarUrl}`}
              alt="user photo"
            />
          </button>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="z-50 absolute text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 right-10 top-16"
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {user.username}
                </span>
                <span className="block text-xs text-gray-500 truncate dark:text-gray-400">
                  {user.email}
                </span>
              </div>
              <ul className="py-2 w-52">
                <li>
                  <Link
                    href={"/edit-profile"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Edit Profile
                  </Link>
                </li>
                <li>
                  <button className="block mx-3 mt-4 py-1 px-2 text-sm rounded bg-red-700 hover:bg-red-600 text-white">
                    <Logout title="Logout" />
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
