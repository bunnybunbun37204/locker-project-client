"use server";

import { NextResponse } from "next/server";

const secret = "05fa61aa574560830e5f460b33c55c377953d4142c2d39185b3f60c23d916dba45405e61fdc5b8a48338128e276aa0b9a4d5f1aaabb6274e0299dd8a42a9275c"

const serviceValidation = async (ticket: string) => {
  try {
    const url = "https://account.it.chula.ac.th/serviceValidation";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "DeeAppId": "app.web.vote-sucu",
        "DeeAppSecret":secret,
        "DeeTicket": ticket,
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': "*",
        'Content-type': 'application/json',
      },
    });

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