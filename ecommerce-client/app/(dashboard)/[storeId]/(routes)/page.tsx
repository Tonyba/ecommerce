import { getStore } from '@/api/store'
import React from 'react'

type Props = {
  params: { storeId: string }
}

const DashboardPage: React.FC<Props> = async ({ params }) => {

  const store = await getStore(params.storeId);

  return (
    <div>
      Active Store: {store?.data?.name}
    </div>
  )
}

export default DashboardPage