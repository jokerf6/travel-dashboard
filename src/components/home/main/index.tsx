import HomeLayout from "@/components/layouts/home.layout";
import React from "react";
import TitleTap from "../TitleTap";
import Button from "@/components/default/button.component";
import TripStore from "@/store/watchlist";
import { useQuery } from "@tanstack/react-query";
import { GetTrips } from "@/services/getTrips";
import Box from "@/components/trips/tripBox";

export default function HomePage() {
  const { setShow } = TripStore();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["trips"],
    queryFn: () => GetTrips(),

    enabled: true,
  });
  return (
    <HomeLayout>
      {!isLoading && (
        <TitleTap
          title="Top Trips"
          num={data.filter((item: any) => item.top === true).length}
        />
      )}{" "}
      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data
            .filter((item: any) => item.top === true)
            .map((item: any) => {
              return <Box key={item.id} top={true} item={item} />;
            })}
        </div>
      )}
      {!isLoading && <TitleTap title="All Trips" num={data.length} />}
      <Button
        bgColor="#2e644e"
        color="white"
        text="Add Trip"
        onClick={() => setShow(true)}
      />
      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((item: any) => {
            return <Box key={item.id} top={false} item={item} />;
          })}
        </div>
      )}
    </HomeLayout>
  );
}
