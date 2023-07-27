<template>
 
  <section id="nav-section" >
      <header id="nav-bar">
          <nav >
              <div id="nav-logo">
                <router-link to="/">
          <img
            class="navbar-img animate__animated animate__bounceIn"
            src="../assets/img/logo-small.png"
            alt="Logo"
          />
        </router-link>
              </div>
              <input id="menu-toggle" type="checkbox" />
              <label class='menu-button-container' for="menu-toggle">
              <div class='menu-button'></div>
            </label>
              <div id="nav-links" class="menu">
                      <li><a><router-link to="/timer">Timer</router-link></a></li>
                      <li><a><router-link to="/">Task Manager</router-link></a></li>
                      <li><a><router-link to="/account">Profile</router-link></a></li>
                      <li><a @click="signOut">SignOut</a></li>
              </div>
              <div id="contact-btn">
                <button @click="signOut" class="button">
                <span class="button-bold">Log Out</span>
              </button>
              </div>
          </nav>
      </header>
  </section>

</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from 'vue';

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try{

    await useUserStore().signOut();
    redirect.push({ path: '/auth/login' })
    // call the user store and send the users info to backend to signOut
    // then redirect user to the homeView
  } catch (error) {}
};

</script>

<style>

/* ------------------------------ Navbar ------------------------------ */

#nav-section {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #33343d;
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
  background-position: bottom center;
  z-index: 9999;
  padding: 0.3rem;
  margin-top: 0;
}

nav {
  width: 90%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
}

#nav-links a {
  text-decoration: none;
  font-weight: 500;
  color: #c4c3ca;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
}

#nav-links a:hover {
  cursor: pointer;
  color:#5594f3;
}

.menu > li:last-child {
  display: none;
}


.button {
  padding: 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  font-weight: 700;
  background-color: #ffeba7;
  color: #102770;
  box-shadow: 0 8px 24px 0 rgba(255,235,167,.2);
}
.button:active,
.button:focus{  
  background-color: #102770;
  font-weight: 700;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}
.button:hover{  
  background-color: #102770;
  font-weight: 700;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
  /* transition: all 0.2s ease; */
}

/* ------------------------------ Hamburguer menu ------------------------------ */

.menu {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.menu > li {
  overflow: hidden;
}

.menu-button-container {
  display: none;
  height: 100%;
  width: 30px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#menu-toggle {
  display: none;
}

.menu-button,
.menu-button::before,
.menu-button::after {
  display: block;
  background-color: #c4c3ca;
  position: absolute;
  height: 4px;
  width: 30px;
  transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 2px;
}

.menu-button::before {
  content: "";
  margin-top: -8px;
}

.menu-button::after {
  content: "";
  margin-top: 8px;
}

#menu-toggle:checked + .menu-button-container .menu-button::before {
  margin-top: 0px;
  transform: rotate(405deg);
}

#menu-toggle:checked + .menu-button-container .menu-button {
  background: rgba(255, 255, 255, 0);
}

#menu-toggle:checked + .menu-button-container .menu-button::after {
  margin-top: 0px;
  transform: rotate(-405deg);
}

@media (max-width: 990px) {

/* ------------------------- Nav Bar responsive ------------------------- */

#nav-section {
  width: 100%;
  background-image: none;
  position: relative;
  padding: 0rem;
  margin: auto;
  background-color: #33343d;
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
}


.menu-button-container {
  display: flex;
}

nav {
    margin: 1.15rem auto;
    width: 80%;
  }

#nav-links a {
    color: #f2f4fc;
    padding-right: 0;
    padding-left: 0;
}  


/* ------------------------- Hamburger menu responsive ------------------------- */

.menu > li:last-child {
  display:block;
  text-align: center;
}

.menu {
  position: absolute;
  top: 0;
  margin-top: 4rem;
  left: 0;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
}

#menu-toggle ~ .menu li {
  height: 0;
  margin: 0;
  padding: 0;
  border: 0;
  transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
}

#menu-toggle:checked ~ .menu li {
  border: 1px solid #6b708d;
  height: 2.5em;
  padding: 0.5em;
  transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
}


.menu > li {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0.5em 0;
  width: 100%;
  color: white;
  background-color: #6b708d;
  z-index: 9999;
}

.menu > li:not(:last-child) {
  border-bottom: 1px solid #444;
}

#contact-btn {
    display: none;
}
}

</style>
