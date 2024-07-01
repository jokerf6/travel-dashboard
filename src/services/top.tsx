import { test } from "@/functions/validations";
import { DESTINATION, TRIPS } from "@/static/links";
import requestService from "@/static/requests";

export async function MakeTop(id: string) {
  const response = await requestService.get(TRIPS + "/" + id + "/top");
}
