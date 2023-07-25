import { db } from '@/src/lib/db';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, context: any) {
  try {
    const users = await db.user.findMany();

    if (!users || users.length === 0) {
      return new Response(JSON.stringify({ error: "Could not find any users." }), { status: 400 });
    }
    
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

