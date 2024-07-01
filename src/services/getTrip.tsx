import { test } from "@/functions/validations";
import { DESTINATION, TRIPS } from "@/static/links";
import requestService from "@/static/requests";

export async function GetTrip(id: string, setIncluded: any, setExcluded: any) {
  const response = await requestService.get(TRIPS + "/" + id);
  setIncluded(response.data.data.TripIncluded);
  setExcluded(response.data.data.TripExcluded);

  return response.data.data;
}
