import { test } from "@/functions/validations";
import { DESTINATION, TRIPS } from "@/static/links";
import requestService from "@/static/requests";

export async function PinService(
  e: any,
  id: string,
  error: any,
  hanelClose: any
) {
  e.preventDefault();

  const name = e.target.title.value;
  const price = e.target.price.value;

  // ************** Name And Brief Testing******************

  if (!name) {
    return error("Please Fill All Fields");
  }
  if (price <= 0) {
    return error("Please Fill All Fields");
  }

  // **************handel Request if we want to upload file******************
  const requestJson = JSON.stringify({
    title: name,
    price,
  });
  const response = await requestService.post(
    TRIPS + "/" + id + "/PriceIncluded",
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
