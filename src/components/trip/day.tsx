import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../default/button.component";
import TextDay from "./textDay";
import { DeleteItem } from "@/services/deleteItem";
import { TRIPS } from "@/static/links";

export default function Day(props: {
  setOpen: any;
  idx: number;
  title: string;
  brief: string;
  open: boolean;
  current: number;
  id: string;
  tripId: string;
}) {
  const { setOpen, id, tripId } = props;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (e: string) => {
      return DeleteItem(e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip"] });
    },
  });
  return (
    <div
      onClick={() => {
        console.log(props.current, props.idx);
        if (props.current === props.idx - 1) {
          setOpen(-1);
        } else {
          setOpen(props.idx - 1);
        }
      }}
      className=" flex flex-col shadow-lg border"
    >
      <div className=" flex gap-4  items-center cursor-pointer  relative ">
        <div className=" bg-primary font-semibold text-[21px] text-white xl:min-w-[30%] lg:min-w-[30%] md:min-w-[30%] min-w-[20%] xl:px-[0px] lg:px-[0px] md:px-[0px] px-[10px] py-[20px] text-center">
          Day {props.idx}
        </div>
        <p className="py-[10px]">{props.title}</p>
        <Button
          bgColor="red"
          color="white"
          text="Delete"
          classBut={"w-fit absolute right-5"}
          onClick={() => {
            mutation.mutate(TRIPS + "/" + id + "/Day");
          }}
        />
      </div>
      <div
        className={`py-[20px] px-[20px] w-full ${
          props.open ? "flex" : "hidden"
        } flex flex-col`}
      >
        {/* <ImageDay /> */}
        <TextDay brief={props.brief} title={props.title} />
      </div>
    </div>
  );
}
