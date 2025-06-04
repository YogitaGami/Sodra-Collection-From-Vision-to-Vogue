export async function generateMetadata({ params }) {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://sodra-collection-from-vision-to-vog.vercel.app"
      : "http://localhost:3000";
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/order/getUserOrders/${params.orderId}`, {
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
