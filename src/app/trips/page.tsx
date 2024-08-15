"use client";
import Button from "@/components/default/button.component";
import ImageUpload from "@/components/default/ImageUpload";
import Inputs from "@/components/default/inputs";
import Model from "@/components/default/modal";
import HomePage from "@/components/home/main";
import TripStore from "@/store/watchlist";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import ReactSelect from "react-select";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetDestination } from "@/services/getDestinations";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CreateTrip } from "@/services/addTrip";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { DeleteTrip } from "@/services/deleteTrip";
const AllPageLayout = dynamic(
  () => import("@/components/layouts/allPage.layout")
);
const Navigator = dynamic(
  () => import("@/components/home/navigator/navigator.component")
);
// const AllPageLayout = dynamic(() => import('@/components/layouts/allPage.layout'))

const Page: NextPage = (req, res) => {
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      width: "100%", // Set the desired width here
      height: "100%", // Set the desired width here
      border: "2px solid #d3d0d0",
      borderRadius: "4px",
      backgroundColor: "#fafafa",
      color: "#929292",
      boxShadow: "none",
      "&:hover": {
        border: "2px solid #d3d0d0",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#d3d0d0" : "transparent",
      color: state.isSelected ? "#ffffff" : "#000000",
      "&:hover": {
        backgroundColor: "#d3d0d0",
        color: "#929292",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#ffffff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      borderRadius: "4px",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: "12px",
      color: "#929292",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#000000",
    }),
  };
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
    setId,
    setName,
    setShow,
    setShow2,
    setBrief,
    setFile,
    updateImg,
    setDuration,
    setPrivate,
    setPackage,
    setNile,
  } = TripStore();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["destinations"],
    queryFn: () => GetDestination(),

    enabled: true,
  });
  const error = async (error: string) => toast.error(error);
  const success = async (success: string) => toast.success(success);
  const { setDestinations, nile, packagee, privatee } = TripStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      CreateTrip(
        name,
        duration,
        destinations,
        brief,
        nile,
        packagee,
        privatee,
        img,
        error,
        success,
        router,
        file,
        handelClose
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
  const mutation2 = useMutation({
    mutationFn: (e) => {
      return DeleteTrip(id, handelClose);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });

  const Body = () => {
    return (
      <div className=" flex flex-col gap-3 items-center ">
        <Inputs
          text="Name"
          holder="Trip name"
          name="name"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        />
        <Inputs
          text="Duration"
          type="number"
          holder="Trip duration"
          name="duration"
          value={duration.toString()}
          onChange={(e: any) => setDuration(e.target.value)}
        />
        <div className=" w-full">
          {!isLoading && (
            <ReactSelect
              options={data.map(
                (des: {
                  id: string;
                  name: string;
                  idImage: string;
                  brief: string;
                }) => ({
                  value: des.id,
                  label: des.name,
                })
              )}
              isMulti
              onChange={(e) =>
                setDestinations(e.map((item: any) => item.value))
              }
              styles={customStyles}
              placeholder="Destinations"
            />
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <span className={"text-textInput text-sm"}>Brief</span>
          <textarea
            value={brief}
            placeholder="Trip brief"
            name="brief"
            rows={4}
            onChange={(e: any) => setBrief(e.target.value)}
            className=" w-full border border-input px-4 py-2 text-sm rounded-md placeholder:text-placeholder"
          />
        </div>
        <div className=" flex w-full justify-between items-center">
          <div className=" flex gap-1">
            <input
              type="checkbox"
              checked={nile}
              onChange={() => setNile(!nile)}
            />
            <span>Nile</span>
          </div>
          <div className=" flex gap-1">
            <input
              type="checkbox"
              checked={packagee}
              onChange={() => setPackage(!packagee)}
            />
            <span>Package</span>
          </div>
          <div className=" flex gap-1">
            <input
              type="checkbox"
              checked={privatee}
              onChange={() => setPrivate(!privatee)}
            />
            <span>Private</span>
          </div>
        </div>
        <ImageUpload setFile={setFile} setImg={updateImg} img={img} />
        <div className=" flex gap-1 w-full mt-[10px]">
          <Button
            // text={mutation.isPending ? "Loading" : "Save"}
            text="Continue"
            bgColor="#2E644E"
            color="white"
            type={"submit"}
            onClick={() => mutation.mutate()}
          />
          <Button
            text="Cancel"
            bgColor="white"
            color="#2E644E"
            onClick={() => {
              handelClose();
            }}
          />
        </div>
      </div>
    );
  };
  const DeleteBody = () => {
    return (
      <div
        className={
          "rounded-[12px] flex flex-col gap-[12px] items-center border-[2px] p-[12px] w-full border-[#EAECF0]  "
        }
      >
        <span className="text-red-600 font-semibold !leading-8">
          You are about to delete <strong>{name}</strong>
        </span>
        <div className="flex justify-between w-full px-5 items-center">
          <button
            className="bg-red-600 rounded-xl p-2"
            onClick={() => {
              mutation2.mutate();
            }}
          >
            <MdOutlineDeleteOutline className=" text-white" />
          </button>
          <button
            className="rounded-md p-2 font-semibold border cursor-pointer"
            onClick={() => handelClose()}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };
  const handelClose = () => {
    setShow(false);
    setShow2(false);
    setName("");
    setDuration(0);
    setBrief("");
    updateImg("");
    setFile("");
    setPrivate(false);
    setNile(false);
    setId("");
    setPackage(false);
  };
  return (
    <>
      <Model
        show={show}
        setShow={setShow}
        title="Add Trip"
        Body={Body}
        close={handelClose}
      />
      <Model
        show={show2}
        setShow={setShow2}
        title="Delete Trip"
        Body={DeleteBody}
        close={handelClose}
      />
      <AllPageLayout>
        <Head>
          <title>Home</title>
        </Head>
        <Navigator current={1} />
        <HomePage />
      </AllPageLayout>
    </>
  );
};

export default Page;
