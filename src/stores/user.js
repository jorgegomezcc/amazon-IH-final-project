import { defineStore } from "pinia";
import { supabase } from "../supabase";

// this store uses options API
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    profile: null
  }),
  actions: {
    async fetchUser() {                                         //fecthuser async function to get the user
      const user = await supabase.auth.user();
      if(user) {
        this.user = user;
        const { data: profile } = await supabase
        .from('profiles')
        .select()
        .match({ user_id: this.user.id })

        if (profile) this.profile = profile[0];
        // console.log('user in store: ', this.user);           clg for see data
        // console.log('profile in store: ', this.profile);     clg for see data
      }
    },


    //signup function to register user
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        // console.log(this.user);                              clg for see data

        const { data: profile } = await supabase
        .from('profiles')
        .insert([
          {
            user_id: this.user.id,
            username: email
          }
        ]);

        if (profileError) {
          throw(profileError);
        } else {
          if(profile) {
            this.profile = profile[0];
          }
        }
      }
    },


    // signIn function to login with user
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      },
      {
        shouldCreateUser: false,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        const { data: profile } = await supabase
        .from('profiles')
        .select()
        .match({ user_id: this.user.id })

        if (profile) this.profile = profile[0];
        console.log('profile in store: ', profile);
      }
    },


    //signout function to singout user
    async signOut(){
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
  },


  //persis data to save in localstorage the login data
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
