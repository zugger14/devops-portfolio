import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, message, honeypot } = await req.json();

    // Silent ignore for automated spam bots filling hidden honeypot
    if (honeypot) {
      return NextResponse.json({
        success: true,
        message: 'Your message has been sent successfully.',
      });
    }

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please enter your name.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please enter your email address.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please enter your message.' },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || 'shirishmaharjan0@gmail.com';

    if (resendApiKey) {
      // Send real email via Resend API
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [recipientEmail],
          reply_to: trimmedEmail,
          subject: `Portfolio Inquiry from ${trimmedName}`,
          text: `New message from ${trimmedName} (${trimmedEmail}):\n\n${trimmedMessage}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
              <h2 style="color: #0f766e; margin-top: 0; font-size: 20px;">New Portfolio Contact Message</h2>
              <div style="margin: 16px 0; padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #0f766e;">
                <p style="margin: 0 0 8px 0;"><strong>Sender:</strong> ${escapeHtml(trimmedName)}</p>
                <p style="margin: 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(trimmedEmail)}" style="color: #0284c7;">${escapeHtml(trimmedEmail)}</a></p>
              </div>
              <p style="font-weight: 600; margin-bottom: 8px;">Message:</p>
              <div style="padding: 16px; background-color: #f1f5f9; border-radius: 8px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #334155;">${escapeHtml(trimmedMessage)}</div>
              <p style="font-size: 11px; color: #94a3b8; margin-top: 24px; text-align: center;">Sent directly via maharjanshirish.com.np Contact Form</p>
            </div>
          `,
        }),
      });

      if (!resendRes.ok) {
        const errorData = await resendRes.json().catch(() => ({}));
        console.error('[Contact API] Resend error:', errorData);
        return NextResponse.json(
          {
            success: false,
            error: errorData.message || 'Failed to dispatch email. Please reach out via email or LinkedIn directly.',
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Thank you! Your message has been sent directly. Shirish will get back to you shortly.',
      });
    }

    // Development/Fallback mode: logs to server stdout when RESEND_API_KEY is not configured
    console.log(`\n======================================================`);
    console.log(`[PORTFOLIO CONTACT FORM SUBMISSION]`);
    console.log(`From:    ${trimmedName} <${trimmedEmail}>`);
    console.log(`Message: ${trimmedMessage}`);
    console.log(`Time:    ${new Date().toISOString()}`);
    console.log(`======================================================\n`);

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent directly. Shirish will get back to you shortly.',
      note: 'Message captured in server logs. (Add RESEND_API_KEY in environment for automated inbox delivery).',
    });
  } catch (err) {
    console.error('[Contact API] Unexpected error:', err);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while sending your message. Please try again or reach out on LinkedIn.',
      },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
