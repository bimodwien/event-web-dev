"use client";

import CategorySelect from "./filterCategory";
import CitySelect from "./filterCity";
import SearchInput from "./filterSearch";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { TEvent } from "@/models/event.mode";
import { axiosInstance } from "@/lib/axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { formatPrice, imgSrc } from "../format";

const EventList = () => {
  const [search, setSearch] = useState<string>("");
  const [event, setEvent] = useState<TEvent[]>([]);
  const [notFound, setNotFound] = useState<string>("");
  const [filterCity, setFilterCity] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);

  const [value] = useDebounce(search, 1000);

  const fetchEvents = async () => {
    try {
      const queryParams: Record<string, any> = {
        title: value,
        ...(filterCategory && { category: filterCategory }),
        ...(filterCity && { city: filterCity }),
        page,
        limit,
      };

      const response = await axiosInstance().get("/events/filter", {
        params: queryParams,
      });
      const { data } = response.data;
      setEvent(data);
      setNotFound("");
    } catch (error) {
      console.error("Error fetching events:", error);
      setNotFound("Event Not Found");
      setEvent([]);
    }
  };

  dayjs.extend(relativeTime);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };

  useEffect(() => {
    setPage(1);
  }, [value, filterCategory, filterCity]);

  useEffect(() => {
    fetchEvents();
  }, [value, filterCity, filterCategory, page, limit]);

  return (
    <div className="w-full flex">
      <div className="px-5 py-10 flex flex-col gap-5 w-60 left-0 h-full">
        <p className="font-semibold text-xl">Filter</p>
        <hr />
        <CategorySelect value={filterCategory} onChange={setFilterCategory} />
        <hr />
        <CitySelect value={filterCity} onChange={setFilterCity} />
      </div>
      <div className="border-l border-gray-300 py-5 px-10 w-full flex flex-col justify-between">
        <SearchInput value={search} onChange={setSearch} />
        <div className="grid max-w-screen-2xl w-full md:grid-cols-3 lg:grid-cols-4  grid-cols-2	gap-5 py-5">
          {event?.map((event) => (
            <Link
              href={`events/${event.id}`}
              key={event.id}
              className="flex flex-col rounded-lg w-56 overflow-hidden shadow bg-white"
            >
              <img
                src={`${imgSrc}${event.id}`}
                alt=""
                className="w-full h-36 object-cover"
              />
              <div className="flex flex-col gap-2 py-2 px-4">
                <p className="text-base font-semibold">{event.title}</p>
                <p className="text-gray-400 text-sm">
                  {dayjs(event.start_event).format("DD MMMM YYYY")}
                </p>
                {event.type === "free" ? (
                  <p className="font-semibold text-sm">Free</p>
                ) : (
                  <>
                    {event.promotion ? (
                      <p className="font-semibold text-sm">
                        Rp {formatPrice(event.promo_price)}
                      </p>
                    ) : (
                      <p className="font-semibold text-sm">
                        Rp {formatPrice(event.ticket_price)}
                      </p>
                    )}
                  </>
                )}

                <hr className="mt-5" />
                <div className="flex gap-2 items-center">
                  <img
                    src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/concert-photography/thumbnail.jpeg"
                    alt=""
                    className="rounded-full w-8 h-8 object-cover"
                  />
                  <p>{event.user.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {notFound && (
          <div className="mx-auto my-auto h-96 w-full flex items-center justify-center">
            <p className="text-center text-2xl font-semibold">
              {notFound} <br />
              try search other event
            </p>
          </div>
        )}
        <div className="flex items-center justify-between gap-5">
          <div className="flex gap-2 items-center">
            <label htmlFor="limit" className="font-semibold">
              Show:
            </label>
            <select
              id="limit"
              value={limit}
              onChange={handleLimitChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5"
            >
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
            </select>
          </div>
          <div className="flex gap-3 items-center text-sm">
            <button
              className={`p-2 rounded-md ${
                page === 1 ? "bg-gray-100 text-gray-500" : "bg-gray-200"
              }`}
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              Prev
            </button>
            <span className=" font-semibold py-2 px-3 rounded-md border-gray-300 border">
              {page}
            </span>
            <button
              className={`p-2 rounded-md ${
                event.length < limit
                  ? "bg-gray-100 text-gray-500"
                  : "bg-gray-200"
              }`}
              onClick={handleNextPage}
              disabled={event.length < limit}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;