import { getBillboard } from "@/api/billboard";
import BillboardForm from "./components/billboard-form";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string; storeId: string };
}) => {
  const billboard = await getBillboard(params.billboardId, params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard.data} />
      </div>
    </div>
  );
};

export default BillboardPage;
