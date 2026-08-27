import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';
import { z } from 'zod';

const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(4000),
});

const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(20),
});

const SYSTEM_PROMPT = `You are the Mercury GP Product Advisor, a knowledgeable and helpful assistant for a premium home-use IPL hair-reduction device called "Mercury GP." Your role is to answer questions about the device, IPL technology, treatment guidance, and skin suitability.

Key product facts you must adhere to:
- Technology: IPL (Intense Pulsed Light), NOT a laser device. Never call it a laser.
- Wavelength: 510-1100 nm
- Flash speed: 0.9 seconds per flash
- Flash capacity: Unlimited for personal use (no cartridge replacements)
- Intensity levels: 5 adjustable levels
- Treatment window: Approx. 3.1 cm²
- Cooling: Integrated active cooling system
- Power: Corded electric (not battery-powered)
- Skin sensor: Built-in contact sensor for automatic flash
- Suitable skin tones: Fitzpatrick I-V
- Brand experience: 17+ years, available in 120+ countries

IMPORTANT RULES:
1. NEVER use these prohibited terms: GP590, GP591, GP592, FDA, CE, "permanent," "guaranteed," "painless"
2. NEVER call the device a laser - it uses IPL technology
3. NEVER promise or imply guaranteed results - always say "individual results vary"
4. NEVER give medical advice - suggest consulting a healthcare professional for medical concerns
5. NEVER make treatment claims beyond what's stated above
6. Be factual, helpful, and conservative in your claims
7. If asked about competitors, be neutral and factual
8. If asked about pricing or purchase, say you don't have that information
9. Keep responses concise (2-4 paragraphs max)
10. If the user writes in Farsi/Persian, respond in Farsi. Otherwise respond in English.`;

const MAX_MESSAGES = 20;

// Reuse a single ZAI instance
let zaiInstance: Awaited<ReturnType<typeof ZAI.create>> | null = null;

async function getZAI() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { messages } = parsed.data;

    // Build full message array with system prompt, trimmed to last 20 messages
    const systemMessage = { role: 'assistant' as const, content: SYSTEM_PROMPT };
    const recentMessages = messages.slice(-(MAX_MESSAGES - 1));
    const fullMessages = [systemMessage, ...recentMessages];

    const zai = await getZAI();

    const completion = await zai.chat.completions.create({
      messages: fullMessages,
      thinking: { type: 'disabled' },
    });

    const response = completion.choices[0]?.message?.content;

    if (!response || response.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'No response generated' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error('Chat API error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
