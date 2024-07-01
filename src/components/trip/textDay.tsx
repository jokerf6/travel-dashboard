import React from "react";

export default function TextDay(props: { brief: string; title: string }) {
  const text = `lldk;fkl <br /> ddf`;
  return (
    <div className="flex gap-4 w-full h-full cursor-pointer">
      <div className="flex h-full relative flex-col items-center justify-center">
        <div className="bg-second w-[15px] h-[15px] rounded-full flex"></div>
      </div>
      <div className="my-[20px] w-fit h-full bg-center relative flex flex-col justify-center">
        <div className="bg-second border-second h-[120%]  left-[-24px] top-[-5px] flex-col absolute flex w-[1px]"></div>

        <p
          className="text-primary2 text-sm"
          dangerouslySetInnerHTML={{ __html: props.brief }}
        ></p>
      </div>
    </div>
  );
}
