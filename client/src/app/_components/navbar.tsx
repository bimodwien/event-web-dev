"use client";

import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Logout from "./logout";
import { IoAdd } from "react-icons/io5";
import SearchOnNavbar from "./searchNav";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userPhotoRef = useRef<HTMLButtonElement>(null);

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
    <nav className="border-gray-200 bg-gray-900 sticky top-0 z-50">
      <div className="max-w-screen flex flex-wrap items-center justify-between mx-5 md:mx-10 py-5">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            TiketFest
          </span>
        </a>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto "
          id="navbar-user"
        >
          {/* <SearchOnNavbar /> */}
        </div>

        <div className="flex items-center gap-2 ">
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
              src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              alt="user photo"
            />
          </button>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="z-50 absolute text-base list-none rounded-lg shadow bg-gray-700 divide-gray-600 right-10 top-16"
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-white">Bonnie Green</span>
                <span className="block text-xs  truncate text-gray-400">
                  name@mail.com
                </span>
              </div>
              <ul className="py-2 w-52">
                <li>
                  <a
                    href="/edit-profile"
                    className="block px-4 py-2 text-sm  hover:bg-gray-600 text-white"
                  >
                    Edit Profile
                  </a>
                </li>
                <li>
                  <button className="block mx-3 mt-4 py-1 px-2 text-sm rounded bg-red-700 hover:bg-red-600 text-white">
                    <Logout />
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
