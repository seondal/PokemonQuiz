import { POKE_API, SITE_URL } from "@/constants/ENV";
import axios from "axios";

export const pokeApi = axios.create({ baseURL: POKE_API });

export const myApi = axios.create({ baseURL: `${SITE_URL}/api` });
