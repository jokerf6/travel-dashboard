"use client";
import SmallLogo from "../../default/smallLogo";
import { BiTrip } from "react-icons/bi";

import { FaPlaceOfWorship } from "react-icons/fa";

import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FaChevronRight } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import { useState } from "react";
import Image from "next/image";
import { SlWallet } from "react-icons/sl";

export default function Navigator(props: { current: number }) {
  const { current } = props;
  const Taps = [
    {
      icon: (
        <BiTrip className={` text-xl ${current === 1 ? "text-white" : ""} `} />
      ),
      name: "Trips",
      link: "/",
    },
    {
      icon: (
        <FaPlaceOfWorship
          className={` text-xl ${current === 2 ? "text-white" : ""} `}
        />
      ),
      name: "Destinations",
      link: "/destinations",
    },
    // {
    //   icon: (
    //     <PortfolioIcon color={`${current === 3 ? "#FFFFFF" : "#ACCDB7"} `} />
    //   ),
    //   name: "Portfolio",
    //   link: "/portfolio",
    // },
    // {
    //   icon: (
    //     <HiOutlineClipboardDocumentCheck
    //       className={` text-xl ${current === 4 ? "text-white" : ""} `}
    //     />
    //   ),
    //   name: "Discover",
    //   link: "/discover",
    // },
  ];
  const router = useRouter();

  const queryClient = useQueryClient();

  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Function to toggle the visibility of dropdown menus
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className=" h-full xl:min-w-60 lg:min-w-60 md:w-fit flex flex-col justify-between">
      <SmallLogo />
      <div className=" flex flex-col gap-3 pt-20 px-4  text-md">
        {Taps.map(
          (item: { icon: any; name: string; link: string }, idx: number) => {
            return (
              <Link
                replace
                href={item["link"]}
                key={idx}
                className={` hover:bg-main2 hover:text-white duration-75 text-nav cursor-pointer flex items-center xl:justify-start lg:justify-start justify-center gap-3 py-2 px-2 w-full ${
                  idx + 1 === current
                    ? "bg-main2 font-bold text-white"
                    : " text-nav"
                } rounded-lg `}
              >
                {item.icon}

                <span className="xl:flex lg:flex hidden">{item["name"]}</span>
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
}
