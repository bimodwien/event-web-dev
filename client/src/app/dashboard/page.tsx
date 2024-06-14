import React from "react";
import Statistic from "./_components/statisticDashboard";
// import ChartDashboard from "./_components/chartDashboard";
import EventReviews from "./_components/eventReviews";

const detail = () => {
  return (
    <>
      <main className="">
        <Statistic />
        {/* <ChartDashboard /> */}
        <EventReviews />
      </main>
    </>
  );
};

export default detail;
