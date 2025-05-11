import connectDB from '@/db/connectDb';
import Dress from '@/models/dresses';
import ArtPiece from '@/models/artPiece';

export async function GET(req) {
  try {
    await connectDB();

    const dresses = await Dress.find().limit(3);
    const artPieces = await ArtPiece.find().limit(3);

    const combined = [
      ...dresses.map(item => ({ ...item._doc, collectionType: 'Dresses' })),
      ...artPieces.map(item => ({ ...item._doc, collectionType: 'ArtPieces' })),
    ];

    return new Response(JSON.stringify(combined), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Server Error' }), { status: 500 });
  }
}
