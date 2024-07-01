import { test } from "@/functions/validations";
import { TRIPS } from "@/static/links";
import requestService from "@/static/requests";

export async function EditTrip(
  //   TripStore: any,
  name: string | undefined,
  duration: number,
  destinations: string[],
  brief: string | undefined,
  nile: boolean,
  packagee: boolean,
  privatee: boolean,
  id: string,
  error: any,
  hanelClose: any
) {
  // ************** Name And Brief Testing******************

  if (!name || !brief || destinations.length === 0) {
    return error("Please Fill All Fields");
  }

  if (duration <= 0) {
    return error("Duration Must be greater than 0");
  }

  // **************handel Request if we want to upload file******************
  const requestJson = JSON.stringify({
    name,
    duration,
    destinations,
    brief,
    privatee,
    packagee,
    nile,
  });

  const response = await requestService.patch(
    TRIPS + "/" + id,
    undefined,
    false,
    requestJson
  );
  if (response["status"] === 200) {
    hanelClose();
  } else {
    return error(response["data"]["message"]);
  }
}
