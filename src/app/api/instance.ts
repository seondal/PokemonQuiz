import { POKE_API } from "@/constants/ENV";
import axios from "axios";

const instance = axios.create({ baseURL: POKE_API });

export default instance;
