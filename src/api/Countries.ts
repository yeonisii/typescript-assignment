import axios from "axios";
import { Country } from "../types/County";

const COUNTRY_API_HOST = "https://restcountries.com/v3.1/all";

export const Countries = async (): Promise<Country[]> => {
  const response = await axios.get<Country[]>(COUNTRY_API_HOST);
  return response.data;
};
