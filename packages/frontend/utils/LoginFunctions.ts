import jwtDecode from "jwt-decode";
import { useAuth } from "@/stores/AuthStore";
import { graphql } from "~~/gql/gql";
import { useUserStore } from "~~/stores/UserStore";

export async function logOut() {
  // load Hooks
  const authStore = useAuth();
  const userStore = useUserStore();
  const { onLogout } = useApollo();

  // logout function

  const query = graphql(`
    query logout {
      logout
    }
  `);

  const { data } = await useAsyncQuery(query, {});
  if (data.value?.logout) {
    authStore.resetStore();
    userStore.resetStore();
    onLogout();
    navigateTo("/login");
  } else {
    authStore.resetStore();
    userStore.resetStore();
    navigateTo("/login");
  }
}

export interface LoginResult {
  token: string | undefined;
  error: Error | null;
}

export async function logIn(
  username: string,
  password: string
): Promise<LoginResult> {
  // call hooks
  const { onLogin } = useApollo();
  const authStore = useAuth();

  const query = graphql(`
    query login($username: String!, $password: String!) {
      login(loginUserInput: { username: $username, password: $password }) {
        access_token
      }
    }
  `);

  const variables = { username, password };
  const { data, error } = await useAsyncQuery(query, variables);

  const token = data.value?.login.access_token;

  if (token) {
    // save new token in apollo client
    await onLogin(token);

    // save user info in store
    authStore.setSession(jwtDecode(token));
    authStore.setUserToken(token);
  }

  return { token, error: error.value };
}
