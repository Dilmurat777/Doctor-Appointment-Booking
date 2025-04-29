// app/api/auth/[kindeAuth]/route.js

import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';

export const dynamic = 'force-dynamic'; // <-- 🔥 ОБЯЗАТЕЛЬНО

export async function GET(request, { params }) {
  const endpoint = params.kindeAuth;
  return handleAuth(request, endpoint);
}
