export async function generateMetadata({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/dresses/${params.id}`, {
    cache: "no-store"});
  const dress = await res.json();

  return {
    title: `${dress.name} | Dress | Sodra`,
    description: `${dress.description?.slice(0, 150)}...`,
  };
}

import DressContent from "./DressContent"

const Derss = () => {
  return (
    <div>
      <DressContent/>
    </div>
  )
}

export default Derss
