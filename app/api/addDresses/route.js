// pages/api/addDress.js

import dbConnect from "@/lib/dbConnect";
import Dress from "@/models/dresses";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const newDress = await Dress.create(req.body);
      res.status(201).json({ success: true, data: newDress });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
