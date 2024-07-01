import { test } from "@/functions/validations";
import { DESTINATION, TRIPS } from "@/static/links";
import requestService from "@/static/requests";

export async function DeleteItem(link: string) {
  const response = await requestService.delete(link);
}
