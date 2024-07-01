import React from "react";

export default function TitleTap(props: { title: string; num?: number }) {
  const { title, num } = props;
  return (
    <div className="  flex justify-between items-center">
      <h1 className=" text-[#111111] text-[21px] font-bold">{title}</h1>
      {num && <span className=" text-gray-600">{num}</span>}
    </div>
  );
}
