export type StoreType = {
  createdAt: string;
  updatedAt: string;
  name: string;
  id: number;
  userId: string;
};

export type BillboardType = {
  id: number;
  label: string;
  imageUrl: string;
  StoreId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateStoreResponse = {
  store: StoreType;
  message: string;
};
