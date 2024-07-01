import { test } from "@/functions/validations";
import { DESTINATION } from "@/static/links";
import requestService from "@/static/requests";

export async function AddDestination(
  name: string | undefined,
  brief: string | undefined,
  file: any,
  img: string,
  error: any,
  success: any,
  setImg: any,
  setName: any,
  setBrief: any,
  setShow: any,
  edit: boolean,
  setEdit: any,
  id: string
) {
  // ************** Name And Brief Testing******************

  if (!name || !brief || img === "") {
    return error("Please Fill All Fields");
  }

  // **************Test******************
  if (test("Img", img, "Please select a valid image")) {
    return;
  }

  // **************handel Request if we want to upload file******************
  const formData = new FormData();
  let response;
  if (img !== "") formData.append("idImage", file!);
  formData.append("name", name);
  formData.append("brief", brief);
  if (edit)
    response = await requestService.patch(
      DESTINATION + "/" + id,
      undefined,
      true,
      formData
    );
  else
    response = await requestService.post(
      DESTINATION,
      undefined,
      true,
      formData
    );

  if (response["status"] === 200) {
    setImg("");
    setName("");
    setBrief("");
    setShow(false);
    setEdit(false);
    success("Add Destination Successfully");
  } else {
    setImg("");
    setName("");
    setBrief("");
    setShow(false);
    setEdit(false);

    return error(response["data"]["message"]);
  }
}
