import { API_URL } from "@/utils/constants";
import { useParams, useRouter } from "next/navigation";
import React, { FC } from "react";
import ApiAlert from "./api-alert";

interface Props {
  entityName: string;
  entityIdName: string;
}

export const ApiList: FC<Props> = ({ entityIdName, entityName }) => {
  const params = useParams();
  const router = useRouter();

  const baseUrl = `${API_URL}/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityIdName}`}
      />
    </>
  );
};
