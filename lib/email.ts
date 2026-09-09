/**
 * Resend Email Utility for GG Physiotherapy Clinic
 * Sends automated notifications to clinic admin and confirmations to patients/users.
 */

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendResendEmail({
  to,
  subject,
  html,
  replyTo,
}: SendEmailParams): Promise<{ success: boolean; data?: Record<string, unknown>; error?: string }> {
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

/**
 * Admin Notification Email for Website Enquiries
 */
export function buildEnquiryEmailTemplate(enquiry: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #0A363D; padding: 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">GG Physiotherapy Clinic</h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: #5eead4;">New Patient Website Enquiry</p>
      </div>
      
      <div style="padding: 24px; color: #334155;">
        <p style="font-size: 15px; margin-top: 0;">You have received a new consultation enquiry via your website contact form:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #0A363D; width: 140px;">Patient Name:</td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${enquiry.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #0A363D;">Phone:</td>
            <td style="padding: 10px 0; color: #0f172a;"><a href="tel:${enquiry.phone}" style="color: #0d9488; text-decoration: none; font-weight: 600;">${enquiry.phone}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #0A363D;">Email:</td>
            <td style="padding: 10px 0; color: #0f172a;">${enquiry.email || "Not provided"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #0A363D;">Subject:</td>
            <td style="padding: 10px 0; color: #0f172a;">${enquiry.subject}</td>
          </tr>
        </table>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #0d9488; padding: 14px 16px; margin: 16px 0; border-radius: 6px;">
          <p style="margin: 0 0 6px; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">Patient Message / Problem Description:</p>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${enquiry.message}</p>
        </div>

        <div style="margin-top: 24px; text-align: center;">
          <a href="https://wa.me/91${enquiry.phone.replace(/[^0-9]/g, '').slice(-10)}" style="display: inline-block; background-color: #0d9488; color: #ffffff; text-decoration: none; padding: 10px 20px; font-weight: 600; border-radius: 8px; font-size: 14px; margin-right: 8px;">Reply via WhatsApp</a>
          <a href="tel:${enquiry.phone}" style="display: inline-block; background-color: #0A363D; color: #ffffff; text-decoration: none; padding: 10px 20px; font-weight: 600; border-radius: 8px; font-size: 14px;">Call Patient</a>
        </div>
      </div>
      
      <div style="background-color: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b;">
        <p style="margin: 0;">GG Physiotherapy Clinic · 22, 1st Main Rd, Perungudi, Chennai 600096 · 90940 26006</p>
      </div>
    </div>
  `;
}

/**
 * User Confirmation Email for Website Enquiries
 */
export function buildUserEnquiryConfirmationTemplate(enquiry: {
  name: string;
  subject: string;
  message: string;
}): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #0A363D; padding: 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 700;">GG Physiotherapy Clinic</h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: #5eead4;">Dr. Sundaravalli Jayakumar (B.P.T, M.P.T ORTHO, DNT, MIAP)</p>
      </div>

      <div style="padding: 24px; color: #334155;">
        <h2 style="margin: 0 0 12px; font-size: 18px; color: #0f172a;">Hello ${enquiry.name},</h2>
        <p style="font-size: 14px; line-height: 1.6; margin: 0 0 16px; color: #475569;">
          Thank you for reaching out to <strong>GG Physiotherapy Clinic</strong>. We have received your message regarding <strong>${enquiry.subject}</strong>.
        </p>

        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0A363D; padding: 14px 16px; margin: 16px 0; border-radius: 6px;">
          <p style="margin: 0 0 6px; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #64748b;">Your Enquiry Summary:</p>
          <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #1e293b; white-space: pre-wrap;">${enquiry.message}</p>
        </div>

        <p style="font-size: 14px; line-height: 1.6; color: #475569;">
          Our clinical desk at Perungudi will review your details and connect with you shortly by phone call or WhatsApp. If you require immediate attention, you can reach us directly:
        </p>

        <div style="margin: 20px 0; padding: 14px; background: #f0fdfa; border: 1px solid #ccfbf1; border-radius: 8px; text-align: center;">
          <p style="margin: 0 0 6px; font-size: 13px; font-weight: 600; color: #0f766e;">Direct Clinic Phone & WhatsApp</p>
          <a href="tel:9094026006" style="display: inline-block; font-size: 16px; font-weight: 800; color: #0A363D; text-decoration: none;">+91 90940 26006</a>
        </div>

        <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin: 0;">
          <strong>Clinic Location:</strong> 22, 1st Main Rd, Thirumalai Nagar Annexe, Perungudi, Chennai 600096<br />
          <strong>Timings:</strong> Mon–Sat: 10am–1pm & 5–9pm | Sun: 11am–1pm
        </p>
      </div>

      <div style="background-color: #f1f5f9; padding: 14px 24px; text-align: center; font-size: 11px; color: #64748b;">
        <p style="margin: 0;">GG Physiotherapy Clinic · Perungudi, Chennai · In-Clinic Rehabilitation</p>
      </div>
    </div>
  `;
}

/**
 * Admin Notification Email for New Appointment Bookings
 */
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
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #0A363D; padding: 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 700;">GG Physiotherapy Clinic</h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: #5eead4;">New In-Clinic Appointment Request</p>
      </div>
      
      <div style="padding: 24px; color: #334155;">
        <div style="display: inline-block; background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; margin-bottom: 16px;">
          IN-CLINIC CONSULTATION (PERUNGUDI)
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #0A363D; width: 140px;">Patient Name:</td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${appointment.fullName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #0A363D;">Phone:</td>
            <td style="padding: 10px 0; color: #0f172a;"><a href="tel:${appointment.phone}" style="color: #0d9488; text-decoration: none; font-weight: 600;">${appointment.phone}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #0A363D;">Email:</td>
            <td style="padding: 10px 0; color: #0f172a;">${appointment.email || "Not provided"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #0A363D;">Requested Date:</td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: 700;">${appointment.preferredDate}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #0A363D;">1-Hour Time Slot:</td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: 700; color: #0e7490;">${appointment.preferredTime}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #0A363D;">Treatment:</td>
            <td style="padding: 10px 0; color: #0f172a;">${appointment.preferredService}</td>
          </tr>
        </table>
        
        ${appointment.message ? `
        <div style="background-color: #f8fafc; border-left: 4px solid #0d9488; padding: 12px 16px; margin: 16px 0; border-radius: 6px;">
          <p style="margin: 0 0 4px; font-weight: 600; font-size: 11px; text-transform: uppercase; color: #64748b;">Notes / Symptoms:</p>
          <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #1e293b;">${appointment.message}</p>
        </div>` : ""}

        <div style="margin-top: 24px; text-align: center;">
          <a href="https://wa.me/91${appointment.phone.replace(/[^0-9]/g, '').slice(-10)}" style="display: inline-block; background-color: #0d9488; color: #ffffff; text-decoration: none; padding: 10px 20px; font-weight: 600; border-radius: 8px; font-size: 14px; margin-right: 8px;">Confirm via WhatsApp</a>
          <a href="tel:${appointment.phone}" style="display: inline-block; background-color: #0A363D; color: #ffffff; text-decoration: none; padding: 10px 20px; font-weight: 600; border-radius: 8px; font-size: 14px;">Call Patient</a>
        </div>
      </div>
      
      <div style="background-color: #f1f5f9; padding: 14px 24px; text-align: center; font-size: 11px; color: #64748b;">
        <p style="margin: 0;">Manage this booking in the Admin Dashboard under Appointments.</p>
      </div>
    </div>
  `;
}

/**
 * Patient Confirmation Email for In-Clinic Appointment Booking
 */
export function buildPatientAppointmentConfirmationTemplate(appointment: {
  fullName: string;
  preferredService: string;
  preferredDate: string;
  preferredTime: string;
  appointmentId?: string;
}): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #0A363D; padding: 26px 20px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">GG Physiotherapy Clinic</h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: #5eead4;">Dr. Sundaravalli Jayakumar • M.P.T (Ortho), MIAP</p>
      </div>

      <div style="padding: 24px; color: #334155;">
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="display: inline-block; background-color: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; font-size: 13px; font-weight: 700; padding: 6px 14px; border-radius: 9999px;">
            ✓ Appointment Request Received
          </div>
        </div>

        <h2 style="margin: 0 0 10px; font-size: 18px; color: #0f172a; text-align: center;">
          Thank You, ${appointment.fullName}!
        </h2>
        <p style="font-size: 14px; line-height: 1.6; color: #475569; text-align: center; margin: 0 0 20px;">
          We have received your in-clinic consultation request. Our clinical reception in Perungudi will review and confirm your slot shortly.
        </p>

        <!-- Booking Details Card -->
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 12px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #0A363D;">
            Consultation Details
          </h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            ${appointment.appointmentId ? `
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 8px 0; color: #64748b;">Booking Reference:</td>
              <td style="padding: 8px 0; font-family: monospace; font-weight: 700; color: #0f172a;">${appointment.appointmentId}</td>
            </tr>` : ""}
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 8px 0; color: #64748b;">Date:</td>
              <td style="padding: 8px 0; font-weight: 700; color: #0f172a;">${appointment.preferredDate}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 8px 0; color: #64748b;">1-Hour Time Slot:</td>
              <td style="padding: 8px 0; font-weight: 700; color: #0A363D;">${appointment.preferredTime}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 8px 0; color: #64748b;">Treatment:</td>
              <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${appointment.preferredService}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Consultation Mode:</td>
              <td style="padding: 8px 0; font-weight: 600; color: #0f766e;">In-Clinic (Perungudi Clinic)</td>
            </tr>
          </table>
        </div>

        <!-- Clinic Location & Assistance Card -->
        <div style="background-color: #f0fdfa; border: 1px solid #ccfbf1; border-radius: 10px; padding: 18px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 8px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #0f766e;">
            Clinic Location &amp; Contact
          </h3>
          <p style="margin: 0 0 8px; font-size: 13px; line-height: 1.5; color: #134e4a;">
            <strong>GG Physiotherapy Clinic</strong><br />
            22, 1st Main Rd, Thirumalai Nagar Annexe, Perungudi, Chennai 600096<br />
            <em>(Landmark: Near Thirumalai Nagar Annexe, Ground Floor Clinic with Dedicated Parking)</em>
          </p>
          <p style="margin: 0 0 12px; font-size: 13px; color: #134e4a;">
            <strong>Clinic Direct Line:</strong> <a href="tel:9094026006" style="color: #0f766e; font-weight: 700; text-decoration: none;">90940 26006</a>
          </p>
          <div style="text-align: center; margin-top: 10px;">
            <a href="https://maps.google.com/?q=GG+Physiotherapy+Clinic+Perungudi+Chennai" style="display: inline-block; background-color: #0A363D; color: #ffffff; text-decoration: none; padding: 10px 18px; font-weight: 600; border-radius: 8px; font-size: 13px;">
              Get Google Maps Directions
            </a>
          </div>
        </div>

        <p style="font-size: 12px; color: #64748b; line-height: 1.5; text-align: center; margin: 0;">
          Please arrive 10 minutes prior to your scheduled slot for registration. If you need to reschedule, kindly contact our desk at 90940 26006.
        </p>
      </div>

      <div style="background-color: #f1f5f9; padding: 14px 24px; text-align: center; font-size: 11px; color: #64748b;">
        <p style="margin: 0;">GG Physiotherapy Clinic · Perungudi, Chennai 600096 · Evidence-Based Physical Therapy</p>
      </div>
    </div>
  `;
}
