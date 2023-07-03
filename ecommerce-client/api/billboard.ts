import { BillboardType, CreateStoreResponse, StoreType } from "@/utils/types";
import { axiosInstance } from "./global";

const routePrefix = "billboard";

export const createBillboard = (data: {
  label: string;
  imageUrl: string;
  StoreId: string;
}) => axiosInstance.post<any | undefined>(`/${routePrefix}`, data);

export const updateBillboard = (
  id: string,
  data: { label: string; imageUrl: string; StoreId: string }
) =>
  axiosInstance.put<BillboardType | undefined>(`/${routePrefix}/${id}`, data);

export const deleteBillboard = (id: string) =>
  axiosInstance.delete(`/${routePrefix}/${id}`);

export const getBillboard = (id: string) =>
  axiosInstance.get<BillboardType | undefined>(`/${routePrefix}/${id}`);
