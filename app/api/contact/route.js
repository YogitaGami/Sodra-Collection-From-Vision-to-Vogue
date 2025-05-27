// app/api/contact/route.js
import { NextResponse } from 'next/server';
import resend from '@/lib/resend'; // Your configured Resend instance
import dbConnect from "@/db/connectDb";
import ContactMessage from '@/models/ContactMessage';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Connect to DB
    await dbConnect();

    // Save message to DB
    const savedMessage = await ContactMessage.create({ name, email, message });

    // Send email notification via Resend
    const data = await resend.emails.send({
      from: process.env.RESEND_EMAIL_FROM, // e.g. 'Sodra Collection <onboarding@resend.dev>'
      to: process.env.NEXT_PUBLIC_ADMIN_EMAIL, // Your admin email
      subject: `New message from ${name} (${email})`,
      text: message,
    });

    return NextResponse.json({ success: true, data, savedMessage });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
