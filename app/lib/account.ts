import User from "@/models/user.model";
import axios from "axios";
import { getCookie } from "./cookie";
import { verifyToken } from "./jwt";

export async function currentAccount() {
  try {
    const requestUrl = `${process.env.ROOT_URL}/api/accounts/profile`;

    const response = await axios.get(requestUrl, {
      headers: {
        Cookie: `access_token_auth=${getCookie("access_token_auth")}`,
      },
    });

    return {
      user: response.data.user,
      error: false,
      message: null,
    };
  } catch (error: any) {
    return {
      user: null,
      error: true,
      message: error.message,
    };
  }
}

export async function isAuthenticatedOrAuthorized(roles: string[]): Promise<{
  authenticated: boolean;
  message: string | null;
  id: string | null | undefined;
}> {
  // for this function to be called there has to be a access_token in the middleware
  let accessToken = getCookie("access_token_auth");

  const { valid, verified, expired }: any = verifyToken(accessToken!);

  if (!valid) {
    return {
      message: "Invalid token id",
      authenticated: false,
      id: null,
    };
  }

  try {
    const user = await User.findById(verified?.id);

    if (!user) {
      return {
        message: "Invalid token id: User not found ",
        authenticated: false,
        id: null,
      };
    }

    if (!roles.includes(user.role)) {
      return {
        message: "Not authorized to perform this action ",
        authenticated: false,
        id: null,
      };
    }

    return {
      message: null,
      authenticated: true,
      id: verified.id,
    };
  } catch (error: any) {
    return {
      message: error.message,
      authenticated: false,
      id: null,
    };
  }
}
