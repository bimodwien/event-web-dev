import Link from "next/link";

const Sidebar = () => {
  return (
    <nav className=" border-gray-200 bg-gray-900  left-0 h-screen w-64">
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
              href="/dashboard"
              className="flex gap-2 hover:bg-gray-500 px-5 py-2"
            >
              Account Information
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
