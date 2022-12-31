// import { acceptHMRUpdate } from "pinia";
import { userSession } from "~~/types/types";

export const useAuth = defineStore("AuthStore", {
  state: () => {
    return {
      userSession: {} as userSession,
      userToken: "" as string,
    };
  },
  getters: {
    getUserSession: (state) => {
      return state.userSession;
    },
    getUserToken: (state) => {
      return state.userToken;
    },
  },
  actions: {
    setSession(newSession: userSession) {
      this.userSession = newSession;
    },
    setUserToken(newToken: string) {
      this.userToken = newToken;
    },
  },
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot));
}
