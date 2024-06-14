"use client";
import Logout from "@/app/_components/logout";
import { useAppSelector } from "@/lib/redux/hooks";
import { Avatar } from "flowbite-react";
import Link from "next/link";

const Sidebar = () => {
  const user = useAppSelector((state) => state.auth);

  return (
    <nav className=" border-gray-200 bg-gray-900  left-0 h-screen w-52">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-5 w-full">
          <Link
            href="/dashboard"
            className="flex items-center space-x-3 rtl:space-x-reverse p-5 "
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              TiketFest
            </span>
          </Link>
          <div className="text-white flex flex-col gap-2 ">
            <p className="font-semibold text-xs px-5">Dashboard</p>
            <div className="flex flex-col text-sm">
              <Link
                href="/dashboard"
                className="flex gap-2 hover:bg-gray-500 px-5 py-2"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/my-event"
                className="flex gap-2 hover:bg-gray-500 px-5 py-2"
              >
                My Event
              </Link>
            </div>
            <hr className="mx-5" />
          </div>
          <div className="text-white flex flex-col gap-3 ">
            <p className="font-semibold text-xs px-5">Account</p>
            <div className="flex flex-col text-sm">
              <Link
                href="/edit-profile"
                className="flex gap-2 hover:bg-gray-500 px-5 py-2"
              >
                Account Information
              </Link>
            </div>
          </div>
          <div className="px-5">
            <div className=" inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
              <Logout title="Log out" />
            </div>
          </div>
        </div>
        <div className="flex flex-col px-5 pb-4 gap-4">
          <div className="flex items-start">
            <Avatar
              img={
                user.avatarUrl
                  ? `http://localhost:8001/users/avatar/${user.avatarUrl}`
                  : undefined
              }
              rounded
            />
          </div>
          <div className="">
            <span className="block text-sm text-white">{user.username}</span>
            <span className="block text-xs truncate text-gray-400">
              {user.email}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
