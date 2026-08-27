import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(2000),
  locale: z.string().optional().default('en'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Log the contact submission (Vercel-compatible, no database)
    console.log('Contact submission:', {
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      locale: parsed.data.locale,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: 'Contact submission received' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
