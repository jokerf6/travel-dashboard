import { cn } from "@/lib/cn";
import React from "react";

export default function Button(props: {
  text: string;
  color: string;
  bgColor: string;
  onClick?: any;
  type?: any;
  classBut?: any;
}) {
  const { type, text, color, bgColor, onClick, classBut } = props;
  return (
    <button
      type={type ? type : "button"}
      onClick={() => onClick()}
      style={{ backgroundColor: bgColor, color: color }}
      className={cn(
        "  py-[10px] px-[14px] rounded-lg text-[14px] w-full",
        classBut
      )}
    >
      {text}
    </button>
  );
}
