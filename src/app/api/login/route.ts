"use server";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const a = process.env.APP_ID;
    console.log(a)
    return NextResponse.json("Insert success");
}
