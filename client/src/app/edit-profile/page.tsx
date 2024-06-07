import React from "react";
// import EditComponent from "./_components/edit.components";
import dynamic from "next/dynamic";

type Props = {};

const Edit = (props: Props) => {
  const EditComponent = dynamic(() => import("./_components/edit.components"), {
    loading: () => <div>loading</div>,
    ssr: false,
  });
  return (
    <>
      <EditComponent />
    </>
  );
};

export default Edit;
