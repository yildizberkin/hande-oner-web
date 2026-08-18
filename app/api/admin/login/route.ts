import { NextResponse } from "next/server";
import {
  createAdminSession,
  validateAdminPassword,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  const password = typeof body.password === "string" ? body.password : "";

  if (!(await validateAdminPassword(password))) {
    return NextResponse.json(
      { message: "Geçersiz yönetici parolası." },
      { status: 401 },
    );
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
