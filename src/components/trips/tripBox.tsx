import { MEDIA } from "@/static/links";
import React from "react";
import Button from "../default/button.component";
import { MdModeEditOutline } from "react-icons/md";
import TripStore from "@/store/watchlist";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MakeTop } from "@/services/top";

export default function Box(props: { item: any; top: boolean }) {
  const { item, top } = props;
  const { setShow2, setName, setId } = TripStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation2 = useMutation({
    mutationFn: () => {
      return MakeTop(item.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
  return (
    <div className="box flex-grow rounded-2xl flex-col  shadow-md">
      <div
        className={`flex  w-full h-[200px] relative   bg-cover bg-center  shadow-sm   rounded-t-md`}
        style={{
          backgroundImage: `url("${MEDIA + item.tripImages[0].idImage}")`,
        }}
      >
        <div className=" absolute top-0 left-0 w-full h-full bg-black bg-opacity-10">
          {/* <div className=" absolute flex gap-2 items-center cursor-pointer px-[6px] top-4 right-5 rounded-md bg-white py-[5px]">
            <MdModeEditOutline
              className=" text-[#2e644e]"
              onClick={() => {
                setEdit(true);
                setId(item.id);
                setName(item.name);
                setBrief(item.brief);
                setImg(MEDIA + item.idImage);
                setShow(true);
              }}
            />
          </div> */}

          <div
            onClick={() => {
              mutation2.mutate();
            }}
            className={` absolute flex gap-2 items-center cursor-pointer px-[10px] top-4 right-5 rounded-md ${
              item.top ? "bg-primary" : " bg-red-500"
            }  py-[5px]`}
          >
            <h1 className=" text-[14px]  text-white ">Top</h1>
          </div>
        </div>
      </div>
      <div className=" p-[10px] bg-white">
        <h1
          className=" text-text text-[20px] font-bold hover:underline cursor-pointer"
          onClick={() => router.replace("/trip/" + item.id)}
        >
          {item.name}
        </h1>
        <p className={` h-[60px]  text-primary2 text-sm overflow-hidden`}>
          {item.brief.length > 100
            ? item.brief.slice(0, 100) + "..."
            : item.brief}
        </p>
      </div>

      <Button
        text="Delete"
        bgColor="red"
        color="white"
        onClick={() => {
          setName(item.name);
          setId(item.id);
          setShow2(true);
        }}
      />
    </div>
  );
}
