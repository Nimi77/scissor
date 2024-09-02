import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import nodemailer from "nodemailer";
import { z } from "zod";
import crypto from "crypto";

const ResetPasswordSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {   
    const body = await req.json();
    const parsedData = ResetPasswordSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { message: "Invalid email address." },
        { status: 400 }
      );
    }

    const { email } = parsedData.data;

    // Checks if the user exists
    const result = await sql`
      SELECT * FROM users WHERE email = ${email};
    `;

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Email not found." },
        { status: 404 }
      );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const expiresIn = new Date(Date.now() + 3600000);
    const expiresInString = expiresIn
      .toISOString()
      .slice(0, 19)
      .replace("T", " "); // 'YYYY-MM-DD HH:MM:SS'
    
    await sql`
      UPDATE users 
      SET reset_token = ${resetToken}, reset_token_expires = ${expiresInString}
      WHERE email = ${email};
    `;
    

    // Send the reset email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${req.nextUrl.origin}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: `"linktrim" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your password",
      html: `
        <p>You requested for a password reset. Click the button below to reset your password</p>
        <a href="${resetLink}" style="
          display: inline-block;
          padding: 10px 24px;
          margin-top:16px;
          font-size: 16px;
          color: white;
          background-color: #FF4C24;
          text-decoration: none;
        ">Reset Password</a>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Reset email to:", email)

    return NextResponse.json(
      { message: "A password reset link has been sent to your email." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling reset password:", error);
    return NextResponse.json(
      { message: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}