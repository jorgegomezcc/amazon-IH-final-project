<template>

    <footer class="footer mt-auto py-1">
        <div class="container d-flex justify-content-center align-items-center">
        <router-link to="/">
            <img src="../assets/img/logoapp.png"  alt="Logo" class="img-fluid footer-logo me-3" />
        </router-link>
        <p class="footer-name mb-0">© Jorge Gomez {{ year }}</p>
        </div>
    </footer>

</template>
    
<script setup>

import moment from "moment";

//save the date data
const year = moment().format("YYYY");

</script>
    
<style scoped>

.footer {
    color: #c4c3ca;
    background-color: #33343d;
    background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
    background-position: bottom center;
}

.footer-logo {
    max-width: 50px; /* Ajusta el tamaño máximo del logo según tus necesidades */
}
    
</style>
      