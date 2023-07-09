import React from "react";

import { format } from "date-fns";

import BillboardClient from "./components/client";
import { getBillboards } from "@/api/billboard";
import { BillBoardColumn } from "./components/columns";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await getBillboards(params.storeId);

  const formattedBillboards: BillBoardColumn[] =
    billboards.data?.map((item) => ({
      id: item.id,
      label: item.label,
      createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
    })) || [];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
