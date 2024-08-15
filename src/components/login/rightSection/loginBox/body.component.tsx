"use client";
import Inputs from "@/components/default/inputs";
import React from "react";
import Remember from "./remember.component";
import Link from "next/link";
import requestService from "@/static/requests";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Body() {
  const router = useRouter();

  return (
    <form className=" flex flex-col gap-3" onSubmit={handelForm}>
      {/* <Inputs holder="Enter your email" text="Email" name="LoginEmail" /> */}
      <Inputs
        holder="*******************"
        text="Password"
        name="LoginPassword"
      />
      {/* <Remember /> */}
      <button
        type="submit"
        className=" bg-main2 py-2  hover:shadow-md text-white rounded-md w-full mb-4 "
      >
        Sign in
      </button>
      {/* <div className=" flex items-center justify-center gap-1">
        <span className=" text-placeholer text-sm  text-center">
          Don’t have an account?{" "}
        </span>
        <Link
          className=" text-main text-sm font-semibold hover:underline "
          href={"/signup"}
        >
          Sign Up
        </Link>
      </div> */}
    </form>
  );
  async function handelForm(e: any) {
    e.preventDefault();
    const Password = e.target.LoginPassword.value;
    const requestJson = JSON.stringify({
      password: Password,
      //  Remember,
    });
    try {
      const response = await requestService.post(
        "/authentication/login",
        undefined,
        false,
        requestJson
      );
      handelResponse(response["status"], response["data"]);
    } catch (err) {
      return err;
    }
  }
  function handelResponse(status: number, data: any) {
    const notify = async (error: string) => toast.error(error);
    console.log(status);
    console.log("/*9/*");
    // **************Invalid Credintial******************
    if (status === 422) {
      return notify("The password provided is incorrect");
    }
    // **************Valid Credintial and User not Active******************
    else if (status === 200) {
      // console.log(farFutureDate);
      setCookie("AccessToken", data["data"]);
      console.log("hi");
      // document.cookie = `AccessToken=${data["token"]}; path=/`;
      router.push("/trips");
    }
  }
}
