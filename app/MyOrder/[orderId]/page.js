export async function generateMetadata({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/order/${params.id}`, {
    cache: "no-store"});
  const orderedItem = await res.json();

  return {
    title: `${orderedItem.username} | OrderedItem | Sodra`,
    description: `${orderedItem.status?.slice(0, 150)}...`,
  };
}

import OrderDetailsContent from "./MyOrderContent"

const OrderDetails = () => {
  return (
    <div>
      <OrderDetailsContent/>
    </div>
  )
}

export default OrderDetails
