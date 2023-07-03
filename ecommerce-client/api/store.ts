import { CreateStoreResponse, StoreType } from "@/utils/types";
import { axiosInstance } from "./global";

const routePrefix = "store";

export const createStore = (
  sessionId: string,
  data: { name: string; userId: string }
) =>
  axiosInstance.post<CreateStoreResponse | undefined>(`/${routePrefix}`, data, {
    params: { _clerk_session_id: sessionId },
  });

export const getStore = (id: string, userId?: string) =>
  axiosInstance.get<StoreType | undefined>(
    `/${routePrefix}/${id}?userId=${userId}`
  );

export const getStoreByUserId = (userId: string) =>
  axiosInstance.get<StoreType>(`/${routePrefix}/user/${userId}`);

export const getStores = (userId: string) =>
  axiosInstance.get<StoreType[]>(`/${routePrefix}/all/${userId}`);

export const updateStore = (
  id: string,
  userId: string,
  data: { name: string }
) =>
  axiosInstance.put<StoreType | undefined>(`/${routePrefix}/${id}`, data, {
    params: { userId },
  });

export const deleteStore = (id: string, userId: string) =>
  axiosInstance.delete(`/${routePrefix}/${id}`, {
    params: { userId },
  });
