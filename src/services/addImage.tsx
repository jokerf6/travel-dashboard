import { test } from "@/functions/validations";
import { DESTINATION, TRIPS } from "@/static/links";
import requestService from "@/static/requests";

export async function ImService(
  file: any,
  img: string,
  id: string,
  error: any,
  handelClose: any
) {
  // ************** Name And Brief Testing******************

  if (img === "") {
    return error("Please Fill All Fields");
  }

  // **************Test******************
  if (test("Img", img, "Please select a valid image")) {
    return;
  }

  // **************handel Request if we want to upload file******************
  const formData = new FormData();
  let response;
  formData.append("idImage", file!);
  formData.append("temp", "true");
  response = await requestService.post(
    TRIPS + "/" + id + "/Image",
    undefined,
    true,
    formData
  );
  handelClose();
}
