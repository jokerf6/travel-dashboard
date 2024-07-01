import React, { useState } from "react";
import HomeLayout from "../layouts/home.layout";
import TitleTap from "../home/TitleTap";
import Button from "../default/button.component";
import Model from "../default/modal";
import { useQuery } from "@tanstack/react-query";
import { GetDestination } from "@/services/getDestinations";
import Box from "./destinationBox";

export default function DesPage(props: {
  setEdit: any;
  setShow: any;
  setShow2: any;

  setName: any;
  setBrief: any;
  setImg: any;
  setId: any;
}) {
  const { setShow, setName, setBrief, setImg, setEdit, setId, setShow2 } =
    props;
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["destinations"],
    queryFn: () => GetDestination(),

    enabled: true,
  });
  return (
    <HomeLayout>
      {/* <div className=" bg-black bg-opacity-15 w-full h-full left-0 absolute top-0 z-[2] flex justify-center items-center">
        <h1>ss</h1> */}
      {/* </div> */}

      {!isLoading && <TitleTap title="All Destinations" num={data.length} />}
      <Button
        bgColor="#2e644e"
        color="white"
        text="Add Destination"
        onClick={() => setShow(true)}
      />

      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map(
            (item: {
              id: string;
              name: string;
              brief: string;
              idImage: string;
            }) => {
              return (
                <Box
                  key={item.id}
                  item={item}
                  setShow={setShow}
                  setName={setName}
                  setBrief={setBrief}
                  setImg={setImg}
                  setShow2={setShow2}
                  setEdit={setEdit}
                  setId={setId}
                />
              );
            }
          )}
        </div>
      )}
    </HomeLayout>
  );
}
