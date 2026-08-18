import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { restorePostRevision } from "@/lib/blog-db";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string; revisionId: string }> }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { id, revisionId } = await params;
  const ok = await restorePostRevision(Number(id), Number(revisionId));
  return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ message: "Not found" }, { status: 404 });
}
