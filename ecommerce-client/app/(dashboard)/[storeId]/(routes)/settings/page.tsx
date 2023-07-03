import { getStore } from "@/api/store";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";
import SettingsForm from "./components/settings-form";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await getStore(params.storeId, userId);

  if (!store.data?.id) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-2 p-8 pt-6">
        <SettingsForm initialData={store.data} />
      </div>
    </div>
  );
};

export default SettingsPage;
