import { NextResponse } from "next/server";
import { createAppointment } from "@/lib/firestore";
import { validateIndianPhone } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      phone,
      email,
      preferredService,
      preferredDate,
      preferredTime,
      consultationMode,
      message,
    } = body;

    // Validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!phone || !validateIndianPhone(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (!preferredDate) {
      return NextResponse.json(
        { error: "Please select your preferred appointment date." },
        { status: 400 }
      );
    }

    const appointmentId = await createAppointment({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : "",
      preferredService: preferredService || "General Physiotherapy Consultation",
      preferredDate,
      preferredTime: preferredTime || "Morning (10:00 AM - 1:00 PM)",
      consultationMode: consultationMode || "clinic",
      message: message ? message.trim() : "",
    });

    // Send Resend email notification to admin asynchronously
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "contact@ggphysiotherapy.com";
    try {
      const { sendResendEmail, buildAppointmentEmailTemplate } = await import("@/lib/email");
      await sendResendEmail({
        to: adminEmail,
        subject: `[New Appointment Request] ${fullName.trim()} (${consultationMode.toUpperCase()}) - ${preferredDate}`,
        html: buildAppointmentEmailTemplate({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email ? email.trim() : "",
          preferredService: preferredService || "General Physiotherapy Consultation",
          preferredDate,
          preferredTime: preferredTime || "Morning (10:00 AM - 1:00 PM)",
          consultationMode: consultationMode || "clinic",
          message: message ? message.trim() : "",
        }),
        replyTo: email ? email.trim() : undefined,
      });
    } catch (emailErr) {
      console.error("Resend appointment email notification failed:", emailErr);
      // Non-blocking
    }

    return NextResponse.json({
      success: true,
      appointmentId,
      message: "Appointment request received successfully! The clinic team will confirm shortly.",
    });
  } catch (error: any) {
    console.error("API appointment error:", error);
    return NextResponse.json(
      { error: "Failed to schedule appointment. Please try calling the clinic directly." },
      { status: 500 }
    );
  }
}
