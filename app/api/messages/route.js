// app/api/admin/messages/route.js
import { NextResponse } from 'next/server';
import dbConnect from "@/db/connectDb";
import ContactMessage from '@/models/contactMessages';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // Optional: Protect route for admins only
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    return NextResponse.json(messages);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to load messages' }, { status: 500 });
  }
}
