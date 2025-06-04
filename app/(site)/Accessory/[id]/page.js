export async function generateMetadata({ params }) {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://sodra-collection-from-vision-to-vog.vercel.app"
      : "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/accessory/${params.id}`, {
    cache: "no-store"});
  const accessory = await res.json();

  return {
    title: `${accessory.name} | Accessory | Sodra`,
    description: `${accessory.description?.slice(0, 150)}...`,
  };
}

import AccessoryContent from './AccessoryContent'

const Accessory = () => {
  return (
    <div>
      <AccessoryContent/>
    </div>
  )
}

export default Accessory
