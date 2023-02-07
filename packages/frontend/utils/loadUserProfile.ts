import { graphql } from "~~/gql/gql";
import { useUserStore } from "~~/stores/UserStore";

export async function loadUserData(): Promise<void> {
  // load relevant information
  const query = graphql(`
    query whoaAmI {
      whoAmI {
        email
        username
        userId
        groups {
          id
          name
        }
      }
    }
  `);

  const result = await sendQuery(query, {});
  if (result.value) {
    const userStore = useUserStore();
    userStore.setUserStore(result.value);
  }
}
