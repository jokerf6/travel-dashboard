import { test } from "@/functions/validations";
import { DESTINATION } from "@/static/links";
import requestService from "@/static/requests";

export async function GetDestination() {
  const response = await requestService.get(DESTINATION);

  return response.data.data;
}
