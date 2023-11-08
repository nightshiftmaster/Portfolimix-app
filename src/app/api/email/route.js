const nodemailer = require("nodemailer");

import { NextResponse } from "next/server";
import connect from "@/utils/db";

export const POST = async (request) => {
  const { name, email, message } = await request.json();
  await connect();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "nightshiftmaster@gmail.com",
      pass: process.env.GMAIL_CODE,
    },
  });

  const mailOptions = {
    from: "nightshiftmaster@gmail.com",
    to: "nightshiftmaster@gmail.com", // Replace with the recipient's email
    subject: "Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      console.log(error);
      console.log(info);
    });
    const responce = new NextResponse("Thank you for feedback!", {
      status: 200,
    });
    responce.headers.set("Access-Control-Allow-Origin", "*");
    return responce;
  } catch (e) {
    return new NextResponse(
      "Email not sent. Check your credentials or try again later",
      { status: 500 }
    );
  }
};
