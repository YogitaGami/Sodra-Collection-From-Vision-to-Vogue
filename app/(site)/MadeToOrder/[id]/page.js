export async function generateMetadata({ params }) {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://sodra-collection-from-vision-to-vog.vercel.app"
      : "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/madeToOrder/${params.id}`, {
    cache: "no-store"});
  const dress = await res.json();

  return {
    title: `${dress.name} | Custom Dress | Sodra`,
    description: `${dress.description?.slice(0, 150)}...`,
  };
}

import MadeToOrderContent from "./MadeToOrderContent"

const MadeToOrder = () => {
  return (
    <div>
      <MadeToOrderContent/>
    </div>
  )
}

export default MadeToOrder
