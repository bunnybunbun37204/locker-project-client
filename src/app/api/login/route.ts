"use server";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
    return NextResponse.json("Insert success");
}
