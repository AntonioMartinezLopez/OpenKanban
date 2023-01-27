import jwtDecode from "jwt-decode";
import { graphql } from "../gql";
import { useAuth } from "@/stores/AuthStore";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const authStore = useAuth();
  const { getToken, onLogin } = useApollo();
  // const session = authStore.getUserSession;

  // load current set token
  const token: string | undefined = await getToken();
  // if there exists a access token in the cookies, verify whether it is valid
  const validToken = !!(token && isTokenValid(token));

  if (!validToken) {
    // try to refresh the access token with a possibly existing refresh token in cookies
    const query = graphql(`
      query refreshToken {
        refreshToken {
          access_token
        }
      }
    `);

    const { data, error } = await useAsyncQuery(query, {});

    // if refreshing access token was succesful, save new session and continue
    if (data.value?.refreshToken) {
      const newAccessToken = data.value.refreshToken.access_token;
      // save new token in apollo client
      onLogin(newAccessToken);

      // save user info in store
      authStore.setSession(jwtDecode(newAccessToken));
      authStore.setUserToken(newAccessToken);
      return;
    }

    // if refreshing token return an error, reset the store and navigate to login
    if (error) {
      authStore.resetStore();
      return navigateTo("/login");
    }
  }
});
