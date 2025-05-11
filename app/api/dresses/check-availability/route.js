import Dress from "@/models/dresses";
import connectDB from "@/db/connectDb";

export const POST = async (req) => {
  await connectDB();
  const { id, startDate, days } = await req.json();

  const rentalStart = new Date(startDate);
  const rentalEnd = new Date(rentalStart);
  rentalEnd.setDate(rentalStart.getDate() + parseInt(days));

  const dress = await Dress.findById(id);

  if (!dress) {
    return Response.json({ available: false, message: "Dress not found" });
  }

  const isOverlapping = dress.bookings.some((booking) => {
    const bookingStart = new Date(booking.startDate);
    const bookingEnd = new Date(booking.endDate);
    return (
      rentalStart <= bookingEnd && rentalEnd >= bookingStart
    );
  });

  return Response.json({ available: !isOverlapping });
};
