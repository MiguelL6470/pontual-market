import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const result = await sql`select version()`
    return NextResponse.json({ ok: true, db: result?.[0]?.version ?? 'unknown' })
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 })
  }
}


