import { API_URL } from "@/utils/constants";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true
})