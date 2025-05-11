import { NextResponse } from 'next/server';
import resend from '@/lib/resend';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: process.env.RESEND_EMAIL_SERVER_USER, // Use exactly this if you're using Resend's default domain
      to: email,
      subject: 'Login Link',
      html: `<p>Click to sign in</p>`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
