// import { acceptHMRUpdate } from "pinia";
import { WhoaAmIQuery } from "~~/gql/graphql";

export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
      email: "",
      userId: "",
      username: "",
      groups: [] as Array<{ id: string; name: string }>,
    };
  },
  getters: {
    getGroups: (state) => {
      return state.groups;
    },
  },
  actions: {
    setUserStore(newData: WhoaAmIQuery) {
      this.email = newData.whoAmI.email;
      this.username = newData.whoAmI.username;
      this.userId = newData.whoAmI.userId;
      this.groups = newData.whoAmI.groups;
    },
    resetStore() {
      this.email = "";
      this.userId = "";
      this.username = "";
      this.groups = [];
    },
  },
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
