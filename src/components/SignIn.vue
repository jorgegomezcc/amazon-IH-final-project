<!-- COMPONENTE BOILERPLATE -->
 
  <template>

  <div class="container">
    <h3 class="header-title">Log In to ToDo App</h3>
    <form @submit.prevent="signIn" class="form-sign-in">
        <div class="form">
          <div class="form-input">
            <label class="imput-field-label">E-mail</label>
            <input 
            type="text"
            class="imput-field"
            placeholder="example@gmail.com"
            id="email"
            v-model="email"
            required
            />
          </div>
          <div class="form-input">
            <label class="input-field-label">Password</label>
            <input 
            type="password"
            class="input-fiel"
            placeholder="***********"
            id="password"
            v-model="password"
            required
            />
          </div>
          <button class="button" type="submit">Sign In</button>
        </div>
    </form>
    <p>Dont have an account? <PersonalRouter :route="route" :buttonText="buttonText" class="sign-up-link"/></p>
  </div>

</template>

<script setup>
import { ref, reactive } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";


// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

// Imput fields
const email = ref("");
const password = ref("");

//Router to push user once SingedUp to logIn
const redirect = useRouter();

//Error message 
const errorMsg = ref("");



// Arrow function to Signin user to supaBase
const signIn = async () => {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signIn(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "error";

</script>

<style></style>
