import Link from "next/link";
import React from "react";

const EventForm = () => {
  return (
    <>
      <section className="bg-gray-50">
        <div className="shadow-md max-w-screen flex flex-wrap items-center justify-between sticky top-0 bg-white">
          <a href="/" className="flex items-center mx-5 md:mx-10 py-5">
            <span className="text-2xl font-semibold p">TiketFest</span>
          </a>
        </div>
        <div className="px-10 py-5 flex flex-col gap-3">
          <form id="create event">
            <div>
              <input
                type="text"
                id="title"
                placeholder="Event Title"
                className="text-2xl"
              />
            </div>
            <div className="flex gap-2 items-center">
              <label htmlFor="">Category</label>
              <input
                type="text"
                id=""
                placeholder=""
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 w-80"
              />
            </div>
            <hr className="font-bold my-5" />
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p>Date & Time</p>
                <div className="flex gap-5">
                  <div className="flex flex-col w-80">
                    <label htmlFor="">Start</label>
                    <input
                      type="datetime-local"
                      id=""
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                  <div className="flex flex-col w-80">
                    <label htmlFor="">End</label>
                    <input
                      type="datetime-local"
                      id=""
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p>Location</p>
                <div className="flex gap-5">
                  <div className="flex flex-col w-80">
                    <label htmlFor="">City</label>
                    <input
                      type="text"
                      id=""
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                  <div className="flex flex-col w-80">
                    <label htmlFor="">Place</label>
                    <input
                      type="text"
                      id=""
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                  <div className="flex flex-col w-80">
                    <label htmlFor="">Address</label>
                    <input
                      type="text"
                      id=""
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr className="font-bold my-5" />
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p>Ticket Detail</p>
                <div>
                  <label
                    htmlFor=""
                    className="block mb-2 text-md font-medium text-gray-900"
                  >
                    Type
                  </label>
                  <div className="flex items-start">
                    <div className="flex items-center gap-5 h-5">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="role"
                          value="eventOrganizer"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        />
                        <div>
                          <label htmlFor="" className="text-md">
                            Paid
                          </label>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="customer"
                          value="customer"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        />
                        <div>
                          <label htmlFor="" className="text-md">
                            Free
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex flex-col w-80">
                    <label htmlFor="">Ticket Quantity</label>
                    <input
                      type="text"
                      id=""
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>

                  <div className="flex flex-col w-80">
                    <label htmlFor="">Limit Buy</label>
                    <input
                      type="text"
                      id=""
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                  <div className="flex flex-col w-80">
                    <label htmlFor="">Ticket Price</label>
                    <input
                      type="text"
                      id=""
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p>Promotion (optional)</p>
                <div className="flex gap-5">
                  <div className="flex flex-col w-80">
                    <label htmlFor="">Discount</label>
                    <input
                      type="text"
                      id=""
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                  <div className="flex flex-col w-80">
                    <label htmlFor="">Start</label>
                    <input
                      type="date"
                      id=""
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                  <div className="flex flex-col w-80">
                    <label htmlFor="">End</label>
                    <input
                      type="date"
                      id=""
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr className="font-bold my-5" />
            <div className="flex flex-col gap-5">
              <div className="flex flex-col w-full">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  placeholder="Enter description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  rows={10}
                ></textarea>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="description">Terms & Conditions</label>
                <textarea
                  id="terms and conditions"
                  placeholder="Enter T&C"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  rows={10}
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <div className="sticky bottom-0 flex w-full justify-end gap-3 border-t-2 border-gray-200 bg-white p-5">
          <button>Cancel</button>
          <button type="submit" form="create event">
            Create
          </button>
        </div>
      </section>
    </>
  );
};

export default EventForm;
