import { test } from "@/functions/validations";
import { TRIPS } from "@/static/links";
import requestService from "@/static/requests";

export async function CreateTrip(
  //   TripStore: any,
  name: string | undefined,
  duration: number,
  destinations: string[],
  brief: string | undefined,
  nile: boolean,
  packagee: boolean,
  privatee: boolean,
  img: string,
  error: any,
  success: any,
  router: any,
  file: string,
  hanelClose: any
) {
  // ************** Name And Brief Testing******************

  if (!name || !brief || img === "" || destinations.length === 0) {
    return error("Please Fill All Fields");
  }

  if (duration <= 0) {
    return error("Duration Must be greater than 0");
  }

  // **************Test******************
  if (test("Img", img, "Please select a valid image")) {
    return;
  }

  // **************handel Request if we want to upload file******************
  const formData = new FormData();
  console.log(file);
  let allDestination = "";
  for (let i = 0; i < destinations.length - 1; i += 1) {
    allDestination += destinations[i] + ",";
  }
  allDestination += destinations[destinations.length - 1];
  formData.append("idImage", file!);
  formData.append("name", name);
  formData.append("duration", duration.toString());
  formData.append("destinations", allDestination);
  formData.append("nile", nile.toString());
  formData.append("packagee", packagee.toString());
  formData.append("privatee", privatee.toString());
  formData.append("brief", brief);

  const response = await requestService.post(TRIPS, undefined, true, formData);
  console.log(response);
  if (response["status"] === 200) {
    hanelClose();
    router.replace("/trip/" + response.data.data.id);
  } else {
    return error(response["data"]["message"]);
  }
}
