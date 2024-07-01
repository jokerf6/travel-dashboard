import { test } from "@/functions/validations";
import { DESTINATION, TRIPS } from "@/static/links";
import requestService from "@/static/requests";

export async function DeleteTrip(id: string, handelClose: any) {
  const response = await requestService.delete(TRIPS + "/" + id);
  handelClose();
}
