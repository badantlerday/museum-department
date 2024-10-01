import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export function GET(request) {
	draftMode().disable();
	return NextResponse.redirect(new URL("/", request.url));
}
