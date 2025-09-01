import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  return Response.json(
    {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
    { status: 200 }
  )
}