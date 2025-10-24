import { ENV } from "./env";

export function getGoogleOAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: ENV.google.redirectUri,
    client_id: ENV.google.clientId,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  picture: string;
  locale: string;
}

export async function getGoogleUser(
  code: string
): Promise<GoogleUserResult> {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: ENV.google.clientId,
    client_secret: ENV.google.clientSecret,
    redirect_uri: ENV.google.redirectUri,
    grant_type: "authorization_code",
  };

  try {
    const tokenResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(values),
    });

    const tokens = await tokenResponse.json();

    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      }
    );

    return await userInfoResponse.json();
  } catch (err: any) {
    console.error(
      `Failed to fetch Google user, redirecting to login. Error: ${err.message}`
    );
    throw new Error(err.message);
  }
}
