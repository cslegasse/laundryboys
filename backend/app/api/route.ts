import { NextResponse } from 'next/server';
import { supabase } from '../../../src/app/lib/supabase/server'; 

export async function GET() {
  // 1. Fetch data from Supabase
  const { data: users, error } = await supabase
    .from('users') 
    .select('*'); 

  // 2. errors
  if (error) {
    console.error('Supabase error:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }

  // 3. Return the data
  return NextResponse.json({ users });
}