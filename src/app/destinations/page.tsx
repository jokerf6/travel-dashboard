"use client";
import Button from "@/components/default/button.component";
import ImageUpload from "@/components/default/ImageUpload";
import Inputs from "@/components/default/inputs";
import Model from "@/components/default/modal";
import DesPage from "@/components/destinations";
import { AddDestination } from "@/services/addDestination";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { DeleteDestination } from "@/services/deleteDestination";
const AllPageLayout = dynamic(
  () => import("@/components/layouts/allPage.layout")
);
const Navigator = dynamic(
  () => import("@/components/home/navigator/navigator.component")
);
// const AllPageLayout = dynamic(() => import('@/components/layouts/allPage.layout'))

const Page: NextPage = (req, res) => {
  const [show, setShow] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);

  const [file, setFile] = useState("");
  const [img, setImg] = useState("");
  const [name, setName] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const [brief, setBrief] = useState<string>("");

  const error = async (error: string) => toast.error(error);
  const success = async (success: string) => toast.success(success);
  const handleChange = (e: any) => {
    return setName(e.target.value);
  };
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (e) => {
      return AddDestination(
        name,
        brief,
        file,
        img,
        error,
        success,
        setImg,
        setName,
        setBrief,
        setShow,
        edit,
        setEdit,
        id
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["destinations"] });
    },
  });
  const mutation2 = useMutation({
    mutationFn: (e) => {
      return DeleteDestination(id, setShow2);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["destinations"] });
    },
  });

  const Body = () => {
    return (
      <div className=" flex flex-col gap-3 items-center ">
        <Inputs
          text="Name"
          holder="Destination name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <div className="flex flex-col gap-1 w-full">
          <span className={"text-textInput text-sm"}>Brief</span>
          <textarea
            value={brief}
            placeholder="Destination brief"
            name="brief"
            rows={4}
            onChange={(e: any) => setBrief(e.target.value)}
            className=" w-full border border-input px-4 py-2 text-sm rounded-md placeholder:text-placeholder"
          />
        </div>

        <ImageUpload setFile={setFile} setImg={setImg} img={img} />
        <div className=" flex gap-1 w-full mt-[10px]">
          <Button
            text={mutation.isPending ? "Loading" : "Save"}
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
              setImg("");
              setName("");
              setBrief("");
              setShow(false);
              setShow2(false);

              setEdit(false);
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
            onClick={() => setShow2(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };
  const handelClose = () => {
    setImg("");
    setName("");
    setBrief("");
    setShow(false);
    setShow2(false);

    setEdit(false);
  };
  return (
    <>
      <Model
        show={show}
        setShow={setShow}
        title="Add Destination"
        Body={Body}
        close={handelClose}
      />
      <Model
        show={show2}
        setShow={setShow2}
        title="Delete Destination"
        Body={DeleteBody}
        close={handelClose}
      />
      <AllPageLayout>
        <Head>
          <title>Home</title>
        </Head>
        <Navigator current={2} />
        <DesPage
          setEdit={setEdit}
          setShow={setShow}
          setShow2={setShow2}
          setName={setName}
          setBrief={setBrief}
          setImg={setImg}
          setId={setId}
        />
      </AllPageLayout>
    </>
  );
};

export default Page;
