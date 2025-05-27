export async function generateMetadata({ params }) {
  console.log('params:', params);
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/artPiece/${params.id}`, {
    cache: "no-store"});
  const artPiece = await res.json();

  return {
    title: `${artPiece.name} | ArtPiece | Sodra`,
    description: `${artPiece.description?.slice(0, 150)}...`,
  };
}

import ArtPieceContent from "./ArtPieceContent"

const ArtPiece = () => {
  return (
    <div>
      <ArtPieceContent/>
    </div>
  )
}

export default ArtPiece
