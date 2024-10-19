import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();  
    const { id } = body;

    if (id === 0) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    } else {
        return NextResponse.json({ message: "Valid ID" }, { status: 200 });
    }
}
