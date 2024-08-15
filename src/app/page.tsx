import Logo from "@/components/default/logo";
import LeftSection from "@/components/login/leftSection.component";
import RightSection from "@/components/login/rightSection/index.component";

import React from "react";

export default function Home() {
  return (
    <div
      className={`w-screen h-screen p-2  flex flex-row justify-center items-center overflow-hidden   bg-main`}
    >
      {/* <h1 className=" text-white text-3xl font-bold absolute top-4 left-4">
        Egypt Sunny
      </h1> */}
      <RightSection />
    </div>
  );
}
