import { BillboardType } from "@/utils/types";
import { axiosInstance } from "./global";

const routePrefix = "billboard";

export const createBillboard = (data: {
  label: string;
  imageUrl: string;
  StoreId: string;
  userId: string;
}) => axiosInstance.post<any | undefined>(`/${routePrefix}`, data);

export const updateBillboard = (
  id: string,
  data: { label: string; imageUrl: string; StoreId: string; userId: string }
) =>
  axiosInstance.put<BillboardType | undefined>(`/${routePrefix}/${id}`, data);

export const deleteBillboard = (id: string, userId: string, storeId: string) =>
  axiosInstance.delete(`/${routePrefix}/${id}`, {
    params: {
      userId,
      storeId,
    },
  });

export const getBillboard = (id: string, storeId: string) =>
  axiosInstance.get<BillboardType | undefined>(`/${routePrefix}/${id}`, {
    params: {
      storeId,
    },
  });

export const getBillboards = (storeId: string) =>
  axiosInstance.get<BillboardType[] | undefined>(
    `/${routePrefix}/all/${storeId}`
  );
