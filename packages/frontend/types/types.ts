export interface userSession {
  username: string;
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

// Fragment data types for of graphQl data
export type FragmentUserData = {
  username: string;
  userId: string;
  email: string;
};
