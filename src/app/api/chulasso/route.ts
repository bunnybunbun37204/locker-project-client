"use server";

import { NextResponse } from "next/server";

const serviceValidation = async (ticket: string) => {
  try {
    const url = "https://account.it.chula.ac.th/serviceValidation";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "DeeAppId": "app.vercel.sci-locker",
        "DeeAppSecret":
          "fc42f10ca65ec5a314f3e989dc69a08dc26868814d399c283c5cdb1bce485265ee873fc939305b313df67b155dd29b0a2535c67030fb5fe9e9755007abceace5",
        "DeeTicket": ticket,
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': "*",
        'Content-type': 'application/json',
      },
    });
    console.log("finish post");

    if (response.ok) {
      const jsonResponse = await response.json()
      return {
        status: 200,
        message: jsonResponse,
      };
    } else {
      console.log("ERROR");

      // Handle non-OK response (e.g., 404, 500, etc.)
      console.error(`Error: ${response.status} - ${response.statusText}`);
      const jsonResponse = await response.json()
      return {
        status: response.status,
        message: jsonResponse
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
  try {
    // Extract the ticket from the URL parameters
    const url = new URL(request.url);
    const ticket = url.searchParams.get("ticket");
    console.log("ticket : ",ticket);
    

    if (!ticket) {
      // Handle the case where the ticket parameter is missing
      return new Response("Ticket parameter is missing", { status: 400 });
    }

    // Use the extracted ticket in your logic or validation
    const { status, message } = await serviceValidation(ticket);
    console.log("Message: ", message);
    

    // Customize your response based on the validation result
    if (message) {
      return NextResponse.redirect('https://sci-locker.vercel.app/booking_demo');
    } else {
      return NextResponse.redirect('https://sci-locker.vercel.app/login');
    }
  } catch (error) {
    // Handle any errors
    return new Response("Internal Server Error", { status: 500 });
  }
}