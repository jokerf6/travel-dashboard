import { test } from "@/functions/validations";
import { DESTINATION, TRIPS } from "@/static/links";
import requestService from "@/static/requests";

export async function GetTrips() {
  const response = await requestService.get(TRIPS);

  return response.data.data;
}
