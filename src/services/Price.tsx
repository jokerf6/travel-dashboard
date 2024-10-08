import { test } from "@/functions/validations";
import { DESTINATION, TRIPS } from "@/static/links";
import requestService from "@/static/requests";

export async function PriceService(
  e: any,
  id: string,
  error: any,
  hanelClose: any
) {
  e.preventDefault();

  const name = e.target.title.value;

  // ************** Name And Brief Testing******************

  if (!name) {
    return error("Please Fill All Fields");
  }
 
  // **************handel Request if we want to upload file******************
  const requestJson = JSON.stringify({
    title: name,
  });
  const response = await requestService.patch(
    TRIPS + "/" + id + "/Prices",
    undefined,
    false,
    requestJson
  );
  if (response["status"] === 200) {
    hanelClose();
  } else {
    hanelClose();

    return error(response["data"]["message"]);
  }
}
