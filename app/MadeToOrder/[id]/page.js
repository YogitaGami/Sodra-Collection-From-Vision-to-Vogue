export async function generateMetadata({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/madeToOrder/${params.id}`, {
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
