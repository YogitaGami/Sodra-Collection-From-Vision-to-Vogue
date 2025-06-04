export async function generateMetadata({ params }) {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://sodra-collection-from-vision-to-vog.vercel.app"
      : "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/dresses/${params.id}`, {
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
