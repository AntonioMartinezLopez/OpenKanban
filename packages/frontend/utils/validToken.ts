import jwtDecode from "jwt-decode";
import { userSession } from "~~/types/types";

export function isTokenValid(token: string): boolean {
  // decode token
  const decodedToken = jwtDecode<userSession>(token);

  // get current utc time in ms
  const currentTime = new Date().getTime() / 1000;

  // as long as current time is smaller then exp time the token is valid
  return currentTime < decodedToken.exp;
}
