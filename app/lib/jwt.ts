import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function signToken(
  tokenType: "refresh" | "access",
  data: { name: string; email: string; id: string }
) {
  return jwt.sign(data, "secret_key", {
    expiresIn:
      tokenType === "access"
        ? "1d"
        : tokenType === "refresh"
        ? "30d"
        : undefined,
  });
}

export function verifyToken(token: string) {
  try {
    const verified = jwt.verify(token, "secret_key");

    return { valid: true, expired: false, verified };
  } catch (error: any) {
    console.log({ error });
    return {
      valid: false,
      expired: error.message === "jwt expired",
      verified: null,
    };
  }
}

export function getAccessToken(request: NextRequest) {
  let token = "";

  const accessToken = request.cookies.get("access_token_auth") || "";

  if (accessToken) {
    return accessToken.value;
  }

  return token;
}
