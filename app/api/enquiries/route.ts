import { NextResponse } from "next/server";
import { createEnquiry } from "@/lib/firestore";
import { validateIndianPhone } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }

    if (!phone || !validateIndianPhone(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (!message || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide your query message." },
        { status: 400 }
      );
    }

    const enquiryId = await createEnquiry({
      name: name.trim(),
      email: email ? email.trim() : "",
      phone: phone.trim(),
      subject: subject || "Website Enquiry",
      message: message.trim(),
    });

    // Send Resend email notification to admin asynchronously
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "contact@ggphysiotherapy.com";
    try {
      const { sendResendEmail, buildEnquiryEmailTemplate } = await import("@/lib/email");
      await sendResendEmail({
        to: adminEmail,
        subject: `[New Website Enquiry] ${name.trim()} - ${subject || "Physiotherapy Consultation"}`,
        html: buildEnquiryEmailTemplate({
          name: name.trim(),
          email: email ? email.trim() : "",
          phone: phone.trim(),
          subject: subject || "Website Enquiry",
          message: message.trim(),
        }),
        replyTo: email ? email.trim() : undefined,
      });
    } catch (emailErr) {
      console.error("Resend email notification failed:", emailErr);
      // Non-blocking: enquiry is already saved in Firestore
    }

    return NextResponse.json({
      success: true,
      enquiryId,
      message: "Thank you for reaching out! Dr. Sundaravalli & the clinic staff will contact you shortly.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to send message. Please try again or call the clinic." },
      { status: 500 }
    );
  }
}
