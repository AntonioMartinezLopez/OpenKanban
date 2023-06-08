export interface userSession {
  username: string;
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

// Fragment data types for of graphQl data
export type FragmentUserData = {
  firstName: string;
  lastName: string;
  username: string;
  userId: string;
  email: string;
};

export interface LoadedTasks {
  id: string;
  name: string;
  description: string;
  weight: number;
  assignees: FragmentUserData[];
  labels: {
    name: string;
    color: string;
    id: string;
  }[];
}
