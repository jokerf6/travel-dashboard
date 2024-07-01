import { test } from "@/functions/validations";
import { DESTINATION, TRIPS } from "@/static/links";
import requestService from "@/static/requests";

export async function ExcludedService(
  e: any,
  id: string,
  error: any,
  hanelClose: any
) {
  e.preventDefault();

  const excluded = e.target.excluded.value;
  // ************** Name And Brief Testing******************

  if (!excluded) {
    return error("Please Fill All Fields");
  }

  // **************handel Request if we want to upload file******************
  const requestJson = JSON.stringify({
    exclude: excluded,
  });
  const response = await requestService.patch(
    TRIPS + "/" + id + "/Ex",
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
