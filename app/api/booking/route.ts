import { NextResponse } from 'next/server';

// Configure these in your .env.local file:
//   WEBHOOK_URL=https://your-webhook-endpoint.com/hook
//   OWNER_EMAIL=owner@example.com  (used if your webhook triggers email delivery)

export async function POST(request: Request) {
  const data = await request.json();

  const webhookUrl = process.env.WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.service,
          date: data.date,
          time: data.time,
          deposit_amount: data.deposit,
          notes: data.notes ?? '',
          submitted_at: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        console.error('[booking] Webhook delivery failed:', res.status, await res.text());
      }
    } catch (err) {
      console.error('[booking] Webhook error:', err);
    }
  } else {
    // Log locally when webhook is not yet configured
    console.log('[booking] New booking (webhook not configured):', data);
  }

  return NextResponse.json({ success: true });
}
