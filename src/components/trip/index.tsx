import React, { useEffect, useState } from "react";
import HomeLayout from "../layouts/home.layout";
import { usePathname } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetTrip } from "@/services/getTrip";
import Tap from "./tap";
import { MEDIA, TRIPS } from "@/static/links";
import Button from "../default/button.component";
import Day from "./day";
import TripStore from "@/store/watchlist";
import Inputs from "../default/inputs";
import ReactSelect from "react-select";
import ImageUpload from "../default/ImageUpload";
import { DeleteItem } from "@/services/deleteItem";
import { IncludedService } from "@/services/included";
import { toast } from "react-toastify";
import { ExcludedService } from "@/services/excluded";

export default function Trip(props: {
  setExShow: any;
  setInShow: any;
  setImShow: any;
  setPinShow: any;
  setPriceShow: any;
  setDayShow: any;
}) {
  const pathName = usePathname();
  const { setInShow, setExShow, setImShow, setDayShow } = props;
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["trip"],
    queryFn: () =>
      GetTrip(pathName.split("/").pop()!, setIncluded, setExcluded),

    enabled: true,
  });
  const error = async (error: string) => toast.error(error);

  const {
    name,
    duration,
    destinations,
    brief,
    img,
    show,
    show2,
    id,
    file,
    included,
    excluded,
    setIncluded,
    setExcluded,
    setId,
    setName,
    setShow,
    setShow2,
    setBrief,
    setFile,
    setDestinations,
    updateImg,
    setDuration,
    setPrivate,
    setPackage,
    setNile,
  } = TripStore();
  const [open, setOpen] = useState(0);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (e: string) => {
      return DeleteItem(e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip"] });
    },
  });
  const handelClose = () => {
    setShow(false);
    setShow2(false);
    setName("");
    setDuration(0);
    setBrief("");
    updateImg("");
    setFile("");
    setInShow(false);
    setExShow(false);
    setPrivate(false);
    setNile(false);
    setId("");
    setPackage(false);
    setImShow(false);
    props.setPinShow(false);
    props.setPriceShow(false);
    props.setDayShow(false);
  };

  return (
    <HomeLayout>
      <div className=" flex flex-row gap-1 w-full">
        <div className=" flex flex-col w-full shadow-md p-[10px] rounded-md ">
          <Tap
            title="Basic Information"
            button={"Edit"}
            onClick={() => {
              setDestinations(data.destinations);
              setName(data.name);
              setBrief(data.brief);
              setDuration(data.duration);
              setPrivate(data.private);
              setPackage(data.package);
              setNile(data.nile);
              setShow(true);
            }}
          />

          {!isLoading && (
            <div className=" flex flex-col gap-2 mt-[10px]">
              <h1 className=" text-p text-[18px] font-semibold">{data.name}</h1>
              <p className=" text-primary2">{data.brief}</p>
              <p className=" text-primary2">Duration: {data.duration}</p>
              <p className=" text-primary2">
                private: {data.private.toString()}
              </p>
              <p className=" text-primary2">
                package: {data.package.toString()}
              </p>
              <p className=" text-primary2">nile: {data.nile.toString()}</p>
              <div className=" flex flex-col">
                <h1 className=" text-p text-[18px] font-semibold">
                  Destinations
                </h1>
                <div className=" flex flex-col ml-[5px]">
                  {data.destinations.map((item: any) => {
                    return (
                      <p key={item.id} className=" text-primary2">
                        {item.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className=" flex flex-col gap-1 w-full h-full">
          <div className=" flex flex-col shadow-md h-full p-[10px] rounded-md">
            <Tap
              title="Trip Included"
              button={"Add"}
              onClick={() => setInShow(true)}
            />

            {!isLoading && (
              <div className=" flex flex-col gap-2 mt-[10px]">
                <div className=" flex flex-col gap-1 ">
                  {included.map((item: any) => {
                    return (
                      <div
                        key={item.id}
                        className=" flex justify-between items-center"
                      >
                        <p className=" text-primary2">{item.include}</p>
                        <Button
                          bgColor="red"
                          color="white"
                          text="Delete"
                          onClick={() =>
                            mutation.mutate(TRIPS + "/" + item.id + "/Included")
                          }
                          classBut={"w-fit"}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className=" flex flex-col shadow-md h-full p-[10px] rounded-md ">
            <Tap
              title="Trip Excluded"
              button={"Add"}
              onClick={() => setExShow(true)}
            />

            {!isLoading && (
              <div className=" flex flex-col gap-2 mt-[10px]">
                <div className=" flex flex-col gap-1 ">
                  {excluded.map((item: any) => {
                    return (
                      <div
                        key={item.id}
                        className=" flex justify-between items-center"
                      >
                        <p className=" text-primary2">{item.exclude}</p>
                        <Button
                          bgColor="red"
                          color="white"
                          text="Delete"
                          onClick={() =>
                            mutation.mutate(TRIPS + "/" + item.id + "/Excluded")
                          }
                          classBut={"w-fit"}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <Tap
          title="Trip Images"
          button={"Add"}
          onClick={() => setImShow(true)}
        />
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[10px]">
            {data.tripImages.map((item: any) => {
              return (
                <div key={item.id}>
                  <div
                    className={`flex  w-full h-[200px] relative   bg-cover bg-center  shadow-sm   rounded-t-md`}
                    style={{
                      backgroundImage: `url("${MEDIA + item.idImage}")`,
                    }}
                  ></div>
                  <Button
                    bgColor="red"
                    color="white"
                    text="Delete"
                    onClick={() => {
                      if (data.tripImages.length > 1) {
                        mutation.mutate(TRIPS + "/" + item.id + "/Image");
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div>
        <Tap
          title="Trip Prices"
          button={"Add"}
          onClick={() => {
            props.setPriceShow(true);
          }}
        />
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[10px]">
            {data.TripsPrices.map((item: any) => {
              return (
                <div key={item.id}>
                  <div
                    className={`flex  w-full gap-1  flex-col  p-[10px]   rounded-t-md shadow-md`}
                  >
                    <h1 className=" font-semibold text-[18px]">{item.title}</h1>
                    <hr />
                    <div className=" flex justify-between items-center">
                      <h1 className=" text-[18px] font-bold">Included</h1>
                      <Button
                        bgColor="black"
                        color="white"
                        text="Add"
                        classBut={"w-fit"}
                        onClick={() => {
                          props.setPinShow(true);
                          setId(item.id);
                        }}
                      />
                    </div>
                    <div className=" flex flex-col my-[10px] ml-[5px]">
                      {item.priceInclude.map((item2: any) => {
                        return (
                          <div key={item2.id} className=" flex flex-col gap-2">
                            <div className=" flex justify-between items-center">
                              <span>{item2.brief}</span>
                              <span>{item2.price}</span>
                              <Button
                                bgColor="red"
                                color="white"
                                text="Delete"
                                classBut={"w-full"}
                                onClick={() => {
                                  mutation.mutate(
                                    TRIPS + "/" + item2.id + "/PriceIncluded"
                                  );
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <Button
                    bgColor="red"
                    color="white"
                    text="Delete"
                    onClick={() => {
                      mutation.mutate(TRIPS + "/" + item.id + "/Price");
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div>
        <Tap
          title="Trip Days"
          button={"Add"}
          onClick={() => setDayShow(true)}
        />
        {!isLoading && (
          <div className="flex  flex-col w-full ">
            {data.tripDays.map((item: any, idx: number) => {
              return (
                <Day
                  key={idx}
                  setOpen={setOpen}
                  open={idx === open}
                  idx={idx + 1}
                  title={item.title}
                  brief={item.brief}
                  current={open}
                  id={item.id}
                  tripId={data.id}
                />
              );
            })}
          </div>
        )}
      </div>
    </HomeLayout>
  );
}
