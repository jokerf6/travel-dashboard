import { test } from "@/functions/validations";
import { DESTINATION, TRIPS } from "@/static/links";
import requestService from "@/static/requests";

export async function DayService(
  e: any,
  id: string,
  error: any,
  hanelClose: any
) {
  e.preventDefault();

  const name = e.target.title.value;
  const brief = e.target.brief.value;

  // ************** Name And Brief Testing******************

  if (!name || !brief) {
    return error("Please Fill All Fields");
  }

  // **************handel Request if we want to upload file******************
  const requestJson = JSON.stringify({
    title: name,
    brief,
  });
  const response = await requestService.patch(
    TRIPS + "/" + id + "/Days",
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
