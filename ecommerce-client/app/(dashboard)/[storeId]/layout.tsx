import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { getStore } from "@/api/store";

import Navbar from "@/components/navbar";

type Props = {
  children: React.ReactNode;
  params: { storeId: string };
};

const DashboardLayout = async ({ children, params }: Props) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await getStore(params.storeId, userId);

  if (!store?.data?.id) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
