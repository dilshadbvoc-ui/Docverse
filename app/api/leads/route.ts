import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")

  const where: any = {}
  if (status) where.status = status

  const leads = await prisma.lead.findMany({
    where,
    include: { assignedTo: true },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(leads)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const lead = await prisma.lead.create({ data: body })
    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 })
  }
}
