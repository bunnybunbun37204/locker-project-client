"use server";

import { NextResponse } from "next/server";

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const NEXT_PUBLIC_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const serviceValidation = async (ticket: string) => {
  try {
    const url = "https://account.it.chula.ac.th/serviceValidation";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        DeeAppId: "app.vercel.sci-locker",
        DeeAppSecret:
          "fc42f10ca65ec5a314f3e989dc69a08dc26868814d399c283c5cdb1bce485265ee873fc939305b313df67b155dd29b0a2535c67030fb5fe9e9755007abceace5",
        DeeTicket: ticket,
      },
      mode: "no-cors",
    });
    console.log("finish post");

    if (response.ok) {
      const jsonResponse = await response.json()
      const text = await response.text()
      return {
        status: 200,
        message: {jsonResponse, text},
      };
    } else {
      console.log("ERROR");

      // Handle non-OK response (e.g., 404, 500, etc.)
      console.error(`Error: ${response.status} - ${response.statusText}`);
      const jsonResponse = await response.json()
      const text = await response.text()
      return {
        status: response.status,
        message: {text, jsonResponse}
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
};

export async function GET(request: Request) {
  const ticket = request.url.slice(request.url.lastIndexOf("/") + 1);
  const {status, message} = await serviceValidation(ticket);
  console.log("Message : ",message)
  return NextResponse.json(message);
}
