"use client";
import Button from "@/components/default/button.component";
import ImageUpload from "@/components/default/ImageUpload";
import Inputs from "@/components/default/inputs";
import Model from "@/components/default/modal";
import HomeLayout from "@/components/layouts/home.layout";
import Trip from "@/components/trip";
import { ImService } from "@/services/addImage";
import { DayService } from "@/services/day";
import { EditTrip } from "@/services/editTrip";
import { ExcludedService } from "@/services/excluded";
import { GetDestination } from "@/services/getDestinations";
import { IncludedService } from "@/services/included";
import { PinService } from "@/services/Pin";
import { PriceService } from "@/services/Price";
import TripStore from "@/store/watchlist";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
const AllPageLayout = dynamic(
  () => import("@/components/layouts/allPage.layout")
);
const Navigator = dynamic(
  () => import("@/components/home/navigator/navigator.component")
);
// const AllPageLayout = dynamic(() => import('@/components/layouts/allPage.layout'))

const Page: NextPage = (req, res) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["destinations"],
    queryFn: () => GetDestination(),

    enabled: true,
  });
  const error = async (error: string) => toast.error(error);
  const queryClient = useQueryClient();
  const [inShow, setInShow] = useState(false);
  const [exShow, setExShow] = useState(false);
  const [imShow, setImShow] = useState(false);
  const [pinShow, setPinShow] = useState(false);
  const [priceShow, setPriceShow] = useState(false);
  const [dayShow, setDayShow] = useState(false);

  const pathName = usePathname();
  const mutation = useMutation({
    mutationFn: (e) => {
      return EditTrip(
        name,
        duration,
        destinations,
        brief,
        nile,
        packagee,
        privatee,
        pathName.split("/").pop()!,
        error,
        handelClose
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip"] });
    },
  });
  const Included = useMutation({
    mutationFn: (e: any) => {
      return IncludedService(e, pathName.split("/").pop()!, error, handelClose);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip"] });
    },
  });
  const PIN = useMutation({
    mutationFn: (e: any) => {
      return PinService(e, id, error, handelClose);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip"] });
    },
  });
  const DAY = useMutation({
    mutationFn: (e: any) => {
      return DayService(e, pathName.split("/").pop()!, error, handelClose);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip"] });
    },
  });
  const PRICE = useMutation({
    mutationFn: (e: any) => {
      return PriceService(e, pathName.split("/").pop()!, error, handelClose);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip"] });
    },
  });
  const Excluded = useMutation({
    mutationFn: (e: any) => {
      return ExcludedService(e, pathName.split("/").pop()!, error, handelClose);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip"] });
    },
  });
  const Im = useMutation({
    mutationFn: () => {
      return ImService(
        file,
        img,
        pathName.split("/").pop()!,
        error,
        handelClose
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip"] });
    },
  });

  const InBody = () => {
    return (
      <form
        className=" flex flex-col gap-3 items-center "
        onSubmit={(e) => Included.mutate(e)}
      >
        <Inputs
          text="included"
          holder="Trip included"
          name="included"
          onChange={(e: any) => setName(e.target.value)}
        />

        <div className=" flex gap-1 w-full mt-[10px]">
          <button
            type="submit"
            className="py-[10px] px-[14px] rounded-lg text-[14px] bg-[#2E644E] text-white w-fit"
          >
            Add
          </button>

          <Button
            text="Cancel"
            bgColor="white"
            color="#2E644E"
            onClick={() => {
              handelClose();
            }}
          />
        </div>
      </form>
    );
  };
  const ExBody = () => {
    return (
      <form
        className=" flex flex-col gap-3 items-center "
        onSubmit={(e) => Excluded.mutate(e)}
      >
        <Inputs
          text="excluded"
          holder="Trip excluded"
          name="excluded"
          onChange={(e: any) => setName(e.target.value)}
        />

        <div className=" flex gap-1 w-full mt-[10px]">
          <button
            type="submit"
            className="py-[10px] px-[14px] rounded-lg text-[14px] bg-[#2E644E] text-white w-fit"
          >
            Add
          </button>

          <Button
            text="Cancel"
            bgColor="white"
            color="#2E644E"
            onClick={() => {
              handelClose();
            }}
          />
        </div>
      </form>
    );
  };
  const PriceBody = () => {
    return (
      <form
        className=" flex flex-col gap-3 items-center "
        onSubmit={(e) => PRICE.mutate(e)}
      >
        <Inputs text="title" holder="Price title" name="title" />

        <div className=" flex gap-1 w-full mt-[10px]">
          <button
            type="submit"
            className="py-[10px] px-[14px] rounded-lg text-[14px] bg-[#2E644E] text-white w-fit"
          >
            Add
          </button>

          <Button
            text="Cancel"
            bgColor="white"
            color="#2E644E"
            onClick={() => {
              handelClose();
            }}
          />
        </div>
      </form>
    );
  };
  const PinBody = () => {
    return (
      <form
        className=" flex flex-col gap-3 items-center "
        onSubmit={(e) => PIN.mutate(e)}
      >
        <Inputs text="title" holder="Price included" name="title" />
        <Inputs type="number" text="price" holder="Price price" name="price" />

        <div className=" flex gap-1 w-full mt-[10px]">
          <button
            type="submit"
            className="py-[10px] px-[14px] rounded-lg text-[14px] bg-[#2E644E] text-white w-fit"
          >
            Add
          </button>

          <Button
            text="Cancel"
            bgColor="white"
            color="#2E644E"
            onClick={() => {
              handelClose();
            }}
          />
        </div>
      </form>
    );
  };
  const DayBody = () => {
    return (
      <form
        className=" flex flex-col gap-3 items-center "
        onSubmit={(e) => DAY.mutate(e)}
      >
        <Inputs text="title" holder="Day title" name="title" />
        <div className="flex flex-col gap-1 w-full">
          <span className={"text-textInput text-sm"}>Brief</span>
          <textarea
            placeholder="Day brief"
            name="brief"
            rows={4}
            className=" w-full border border-input px-4 py-2 text-sm rounded-md placeholder:text-placeholder"
          />
        </div>

        <div className=" flex gap-1 w-full mt-[10px]">
          <button
            type="submit"
            className="py-[10px] px-[14px] rounded-lg text-[14px] bg-[#2E644E] text-white w-fit"
          >
            Add
          </button>

          <Button
            text="Cancel"
            bgColor="white"
            color="#2E644E"
            onClick={() => {
              handelClose();
            }}
          />
        </div>
      </form>
    );
  };
  // const mutation2 = useMutation({
  //   mutationFn: (e) => {
  //     return DeleteDestination(id, setShow2);
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["destinations"] });
  //   },
  // });
  const {
    name,
    duration,
    destinations,
    brief,
    nile,
    privatee,
    packagee,
    img,
    show,
    show2,
    id,
    file,
    setDestinations,
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
    setPinShow(false);
    setPriceShow(false);
    setDayShow(false);
  };
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
              defaultValue={data
                .filter((item: any) =>
                  destinations.some(
                    (destination: any) => destination.name === item.name
                  )
                )
                .map((des: any) => ({
                  value: des.id,
                  label: des.name,
                }))}
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
  const ImBody = () => {
    return (
      <div className=" flex flex-col gap-3 items-center ">
        <ImageUpload setFile={setFile} setImg={updateImg} img={img} />

        <div className=" flex gap-1 w-full mt-[10px]">
          <Button
            // text={mutation.isPending ? "Loading" : "Save"}
            text="Continue"
            bgColor="#2E644E"
            color="white"
            type={"submit"}
            onClick={() => Im.mutate()}
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

  return (
    <>
      <Model
        show={show}
        setShow={setShow}
        title="Edit Trip"
        Body={Body}
        close={handelClose}
      />
      <Model
        show={inShow}
        setShow={setInShow}
        title="Add Trip Included"
        Body={InBody}
        close={handelClose}
      />
      <Model
        show={exShow}
        setShow={setExShow}
        title="Add Trip Excluded"
        Body={ExBody}
        close={handelClose}
      />
      <Model
        show={pinShow}
        setShow={setPinShow}
        title="Add Price Included"
        Body={PinBody}
        close={handelClose}
      />
      <Model
        show={priceShow}
        setShow={setPriceShow}
        title="Add Price"
        Body={PriceBody}
        close={handelClose}
      />
      <Model
        show={imShow}
        setShow={setImShow}
        title="Add Trip Images"
        Body={ImBody}
        close={handelClose}
      />
      <Model
        show={dayShow}
        setShow={setDayShow}
        title="Add Trip Day"
        Body={DayBody}
        close={handelClose}
      />
      <AllPageLayout>
        <Head>
          <title>Home</title>
        </Head>
        <Navigator current={0} />
        <Trip
          setInShow={setInShow}
          setExShow={setExShow}
          setImShow={setImShow}
          setPinShow={setPinShow}
          setPriceShow={setPriceShow}
          setDayShow={setDayShow}
        />
      </AllPageLayout>
    </>
  );
};

export default Page;
