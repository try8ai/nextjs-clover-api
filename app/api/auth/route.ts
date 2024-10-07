import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Config Set Up
const targetEnv = 'https://sandbox.dev.clover.com'; // Pointing to Sandbox Environment


const appID = process.env.CLOVER_APP_ID;
const appSecret = process.env.CLOVER_APP_SECRET;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    // If there is no 'code' parameter, redirect the user for authentication
    const url = `${targetEnv}/oauth/authorize?client_id=${appID}`;
    return NextResponse.redirect(url);
  } else {
    // If we have a code, request the API token
    return await requestAPIToken(code);
  }
}

async function requestAPIToken(code: string) {
  const url = `${targetEnv}/oauth/token`;
  const data = {
    client_id: appID,
    client_secret: appSecret,
    code: code
  };

  try {
    const response = await axios.post(url, data);

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
