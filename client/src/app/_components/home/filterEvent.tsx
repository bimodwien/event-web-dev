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
import { avatar, formatPrice, imgSrc } from "../format";
import { Avatar } from "flowbite-react";

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
  const currentDate = new Date();

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
    <div className="w-full flex md:flex-row flex-col">
      <div className="p-3 gap-3 md:px-5 md:py-10 flex flex-col md:gap-5 w-full md:w-60 left-0 h-full">
        <p className="font-semibold text-xl md:text-start text-center">
          Filter
        </p>
        <hr />
        <div className="flex md:flex-col gap-5 md:gap-3 justify-center md:justify-normal">
          <CategorySelect value={filterCategory} onChange={setFilterCategory} />
          <hr className="hidden md:block" />
          <CitySelect value={filterCity} onChange={setFilterCity} />
        </div>
      </div>
      <div className="border-l border-gray-300 py-5 px-10 w-full flex flex-col justify-between">
        <SearchInput value={search} onChange={setSearch} />
        <div className="max-w-screen-2xl w-full flex flex-wrap gap-5 py-5 justify-center">
          {event?.map((event) => (
            <Link
              href={`events/${event.id}`}
              key={event.id}
              className="flex md:flex-col md:justify-between rounded-lg w-full md:w-56 overflow-hidden shadow bg-white"
            >
              <img
                src={`${imgSrc}${event.id}`}
                alt=""
                className="h-full w-36 md:w-full md:h-36 object-cover"
              />
              <div className="flex flex-col gap-2 py-2 px-4">
                <p className="text-base font-semibold">{event.title}</p>
                <p className="text-gray-400 text-sm">
                  {dayjs(event.start_event).format("DD MMMM YYYY")}
                </p>
                {event.type === "free" ? (
                  <p className="font-semibold text-sm">Free</p>
                ) : (
                  <div className="md:flex gap-1">
                    <p className="font-semibold text-sm">
                      Rp{" "}
                      {formatPrice(
                        event.promotion &&
                          event.start_promo &&
                          event.end_promo &&
                          currentDate > new Date(event.start_promo) &&
                          currentDate < new Date(event.end_promo)
                          ? event.promo_price
                          : event.ticket_price
                      )}
                    </p>
                    {event.promotion &&
                    event.start_promo &&
                    event.end_promo &&
                    currentDate > new Date(event.start_promo) &&
                    currentDate < new Date(event.end_promo) ? (
                      <span className="text-sm text-gray-500 line-through">
                        Rp {formatPrice(event.ticket_price)}
                      </span>
                    ) : null}
                  </div>
                )}

                <hr className="mt-5" />
                <div className="flex gap-2 items-center">
                  <Avatar
                    img={
                      event.user.avatarUrl
                        ? `${avatar}${event.user.avatarUrl}`
                        : undefined
                    }
                    rounded
                    size="sm"
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
        <div className="flex items-center justify-between gap-5 flex-wrap">
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
