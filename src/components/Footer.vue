<template>
    <footer>
      <div class="footer-section">

        <div class="footer-content">
          <img
            src="../assets/img/logoapp.png"
            width="40"
            height="35"
            alt="Logo ToDo App"/>

          <p>Jorge Gomez {{ year }}</p>

        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import moment from "moment";
  
  //save the date data
  const year = moment().format("YYYY");
  </script>
  
  <style scoped>

  .footer-section {
    display: flex;
    justify-content: center;
    background-color: #33343d;
    background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
    background-position: bottom center;

  }

.footer-content {
    display: flex;
    align-items: center;
    text-align: center;
}

p {
    padding-left: 1rem;
    color: #c4c3ca;
    text-align: center;
}

  </style>