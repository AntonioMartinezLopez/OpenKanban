import { OperationVariables, TypedDocumentNode } from "@apollo/client";
import { Ref } from "vue";
import jwtDecode from "jwt-decode";
import { logOut } from "./LoginFunctions";
import { graphql } from "~~/gql/gql";
import { Exact } from "~~/gql/graphql";
import { useAuth } from "@/stores/AuthStore";

export async function sendQuery<T>(
  query: TypedDocumentNode<
    T,
    Exact<{
      [key: string]: never;
    }>
  >,
  variables: OperationVariables
): Promise<Ref<T | null>> {
  // First, try to fetch data from query
  const { data, error } = await useAsyncQuery(query, variables);

  // If error due to unauthorization, start procedure to refresh access token
  if (error.value?.message === "Unauthorized") {
    // load important composables
    const { onLogin } = useApollo();
    const authStore = useAuth();

    const query = graphql(`
      query refreshToken {
        refreshToken {
          access_token
        }
      }
    `);
    const { data: refreshData } = await useAsyncQuery(query, {});

    // if refreshing access token was succesful, save new session and continue
    if (refreshData.value?.refreshToken) {
      const newAccessToken = refreshData.value.refreshToken.access_token;
      // save new token in apollo client
      onLogin(newAccessToken);

      // save user info in store
      authStore.setSession(jwtDecode(newAccessToken));
      authStore.setUserToken(newAccessToken);

      // repeat the query
      const { data: newTryData } = await useAsyncQuery(query, variables);

      if (newTryData.value) {
        return data;
      } else {
        logOut();
      }
    } else {
      logOut();
    }
  }

  return data;
}
