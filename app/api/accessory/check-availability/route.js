import Accessory from "@/models/accessory";
import connectDB from "@/db/connectDb";

export const POST = async (req) => {
  await connectDB();
  const { id, startDate, days } = await req.json();

  const rentalStart = new Date(startDate);
  const rentalEnd = new Date(rentalStart);
  rentalEnd.setDate(rentalStart.getDate() + parseInt(days));

  const accessory = await Accessory.findById(id);

  if (!accessory) {
    return Response.json({ available: false, message: "Accessory not found" });
  }

  const isOverlapping = accessory.bookings.some((booking) => {
    const bookingStart = new Date(booking.startDate);
    const bookingEnd = new Date(booking.endDate);
    return (
      rentalStart <= bookingEnd && rentalEnd >= bookingStart
    );
  });

  return Response.json({ available: !isOverlapping });
};
