import { cookies } from "next/headers";

export function getCookie(cookieName: string) {
  return cookies().get(cookieName)?.value;
}

export function setCookie(cookieName: string, cookieValue: string) {
  cookies().set({
    name: cookieName,
    value: cookieValue,
    httpOnly: true,
  });
}
