import { useAuth } from "@/stores/AuthStore";

export default defineNuxtRouteMiddleware((_to, _from) => {
  // first: check if there is an active user in the store
  const authStore = useAuth();
  const session = authStore.getUserSession;
  // if a user is in store check for validity of current access_token
  if (session.userId) {
    const currentTime = new Date().getTime() / 1000;
    // if expiration date was surpassed try to refresh, else redirect to login
    if (currentTime > session.exp) {
      return navigateTo("/login");
    }
    // if no user is in store check if cooke is still valid
  } else {
    // test
  }
  // isAuthenticated() is an example method verifying if an user is authenticated
  // const { getToken } = useApollo();
  // const token = await getToken();
  // if (token) {
  //   console.log(token);
  // }
  // // token.then((te) => console.log(te));
  //   if (isAuthenticated() === false) {
  //     return navigateTo("/login");
  //   }
});
