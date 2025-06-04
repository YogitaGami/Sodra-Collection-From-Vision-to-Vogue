export async function generateMetadata({ params }) {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://sodra-collection-from-vision-to-vog.vercel.app"
      : "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/artPiece/${params.id}`, {
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
