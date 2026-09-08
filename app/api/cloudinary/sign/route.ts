import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { folder = "gg_physio", paramsToSign = {} } = await request.json();

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        {
          configured: false,
          error: "Cloudinary credentials are not configured in environment variables.",
          message: "Please configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local",
        },
        { status: 200 }
      );
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
        ...paramsToSign,
      },
      apiSecret
    );

    return NextResponse.json({
      configured: true,
      signature,
      timestamp,
      cloudName,
      apiKey,
      folder,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to generate Cloudinary signature" },
      { status: 500 }
    );
  }
}
