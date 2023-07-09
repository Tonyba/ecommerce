"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { BillBoardColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface BillboardClientProsp {
  data: BillBoardColumn[];
}

const BillboardClient: FC<BillboardClientProsp> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data?.length})`}
          description="Manage billboard for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading title="API" description="API calls for billboards" />
      <Separator />

      <ApiList entityIdName="billboards" entityName="billboardId" />
    </>
  );
};

export default BillboardClient;
