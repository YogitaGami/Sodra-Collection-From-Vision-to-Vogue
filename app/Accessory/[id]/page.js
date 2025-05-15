export async function generateMetadata({ params }) {
  console.log('params:', params);
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/accessory/${params.id}`, {
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
