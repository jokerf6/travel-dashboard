import React from "react";
import Button from "../default/button.component";

export default function Tap(props: {
  title: string;
  button: string;
  onClick?: any;
}) {
  return (
    <div className=" flex flex-col w-full">
      <div className=" w-full  flex justify-between items-center mb-[10px]">
        <h1 className=" font-semibold text-[18px] text-p">{props.title}</h1>
        <Button
          bgColor="black"
          color="white"
          text={props.button}
          classBut={"w-fit"}
          onClick={props.onClick}
        />
      </div>
      <hr />
    </div>
  );
}
