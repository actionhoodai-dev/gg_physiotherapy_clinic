/**
 * Resend Email Utility for GG Physiotherapy Clinic
 * Sends automated notifications to clinic admin and confirmation to patients.
 */

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendResendEmail({ to, subject, html, replyTo }: SendEmailParams): Promise<{ success: boolean; data?: Record<string, unknown>; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not defined in environment variables. Email notification skipped.");
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    const fromAddress = process.env.RESEND_FROM_EMAIL || "GG Physio Clinic <onboarding@resend.dev>";
    const payload = {
      from: fromAddress,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    };

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend API error:", data);
      return { success: false, error: data?.message || "Failed to send email via Resend" };
    }

    return { success: true, data };
  } catch (error: unknown) {
    console.error("Failed sending email with Resend:", error);
    const message = error instanceof Error ? error.message : "Unknown email error";
    return { success: false, error: message };
  }
}

export function buildEnquiryEmailTemplate(enquiry: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #0c4a60; padding: 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">GG Physiotherapy Clinic</h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: #5eead4;">New Patient Website Enquiry</p>
      </div>
      
      <div style="padding: 24px; color: #334155;">
        <p style="font-size: 15px; margin-top: 0;">You have received a new consultation enquiry via your website:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #0c4a60; width: 140px;">Patient Name:</td>
            <td style="padding: 10px 0; color: #0f172a;">${enquiry.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #0c4a60;">Phone:</td>
            <td style="padding: 10px 0; color: #0f172a;"><a href="tel:${enquiry.phone}" style="color: #0d9488; text-decoration: none; font-weight: 600;">${enquiry.phone}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #0c4a60;">Email:</td>
            <td style="padding: 10px 0; color: #0f172a;">${enquiry.email || "Not provided"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #0c4a60;">Subject:</td>
            <td style="padding: 10px 0; color: #0f172a;">${enquiry.subject}</td>
          </tr>
        </table>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #0d9488; padding: 14px 16px; margin: 16px 0; border-radius: 4px;">
          <p style="margin: 0 0 6px; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">Patient Message / Problem Description:</p>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${enquiry.message}</p>
        </div>

        <div style="margin-top: 24px; text-align: center;">
          <a href="https://wa.me/91${enquiry.phone.replace(/[^0-9]/g, '').slice(-10)}" style="display: inline-block; background-color: #0d9488; color: #ffffff; text-decoration: none; padding: 10px 20px; font-weight: 600; border-radius: 6px; font-size: 14px; margin-right: 8px;">Reply via WhatsApp</a>
          <a href="tel:${enquiry.phone}" style="display: inline-block; background-color: #0c4a60; color: #ffffff; text-decoration: none; padding: 10px 20px; font-weight: 600; border-radius: 6px; font-size: 14px;">Call Patient</a>
        </div>
      </div>
      
      <div style="background-color: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b;">
        <p style="margin: 0;">GG Physiotherapy Clinic · 22, 1st Main Rd, Perungudi, Chennai 600096 · 090940 26006</p>
      </div>
    </div>
  `;
}

export function buildAppointmentEmailTemplate(appointment: {
  fullName: string;
  phone: string;
  email: string;
  preferredService: string;
  preferredDate: string;
  preferredTime: string;
  consultationMode: string;
  message?: string;
}): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #0c4a60; padding: 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 700;">GG Physiotherapy Clinic</h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: #5eead4;">New Appointment Request Booking</p>
      </div>
      
      <div style="padding: 24px; color: #334155;">
        <div style="display: inline-block; background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; margin-bottom: 16px;">
          Mode: ${appointment.consultationMode.toUpperCase()} CONSULTATION
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #0c4a60; width: 140px;">Patient Name:</td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${appointment.fullName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #0c4a60;">Phone:</td>
            <td style="padding: 10px 0; color: #0f172a;"><a href="tel:${appointment.phone}" style="color: #0d9488; text-decoration: none; font-weight: 600;">${appointment.phone}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #0c4a60;">Requested Date:</td>
            <td style="padding: 10px 0; color: #0f172a;">${appointment.preferredDate}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #0c4a60;">Preferred Time:</td>
            <td style="padding: 10px 0; color: #0f172a;">${appointment.preferredTime}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #0c4a60;">Service:</td>
            <td style="padding: 10px 0; color: #0f172a;">${appointment.preferredService}</td>
          </tr>
        </table>
        
        ${appointment.message ? `
        <div style="background-color: #f8fafc; border-left: 4px solid #0d9488; padding: 12px 16px; margin: 16px 0; border-radius: 4px;">
          <p style="margin: 0 0 4px; font-weight: 600; font-size: 11px; text-transform: uppercase; color: #64748b;">Notes / Symptoms:</p>
          <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #1e293b;">${appointment.message}</p>
        </div>` : ""}

        <div style="margin-top: 24px; text-align: center;">
          <a href="https://wa.me/91${appointment.phone.replace(/[^0-9]/g, '').slice(-10)}" style="display: inline-block; background-color: #0d9488; color: #ffffff; text-decoration: none; padding: 10px 20px; font-weight: 600; border-radius: 6px; font-size: 14px; margin-right: 8px;">Confirm via WhatsApp</a>
          <a href="tel:${appointment.phone}" style="display: inline-block; background-color: #0c4a60; color: #ffffff; text-decoration: none; padding: 10px 20px; font-weight: 600; border-radius: 6px; font-size: 14px;">Call Patient</a>
        </div>
      </div>
      
      <div style="background-color: #f1f5f9; padding: 14px 24px; text-align: center; font-size: 11px; color: #64748b;">
        <p style="margin: 0;">Manage this booking in the Admin Dashboard under Appointments.</p>
      </div>
    </div>
  `;
}
