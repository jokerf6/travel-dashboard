import { test } from "@/functions/validations";
import { DESTINATION } from "@/static/links";
import requestService from "@/static/requests";

export async function DeleteDestination(id: string, setShow2: any) {
  const response = await requestService.delete(DESTINATION + "/" + id);
  setShow2(false);
  return response.data.data;
}
