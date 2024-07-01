import { test } from "@/functions/validations";
import { DESTINATION, TRIPS } from "@/static/links";
import requestService from "@/static/requests";

export async function IncludedService(
  e: any,
  id: string,
  error: any,
  hanelClose: any
) {
  e.preventDefault();
  console.log(e.target.included.value);

  const included = e.target.included.value;
  // ************** Name And Brief Testing******************

  if (!included) {
    return error("Please Fill All Fields");
  }

  // **************handel Request if we want to upload file******************
  const requestJson = JSON.stringify({
    include: included,
  });
  const response = await requestService.patch(
    TRIPS + "/" + id + "/In",
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
