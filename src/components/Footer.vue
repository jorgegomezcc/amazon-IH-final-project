<template>
    <footer>
      <div class="footer-section">
        <div class="footer-logo">
          <img
            src=""
            width="40"
            height="40"
            alt="Logo ToDo App"
          />
        </div>
        <div class="footer-separador"></div>
        <div class="footer-text">
          <p>Jorge gomez {{ year }}</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import moment from "moment";
  
  //guardamos el año actual en format YYYY en una variable
  const year = moment().format("YYYY");
  </script>
  
  <style scoped>
  .footer-section {
    text-align: center;
    margin-top: 10px;
  }
  
  .footer-separador {
    border-top: 1px solid rgb(48, 49, 52, 0.1);
    height: 2px;
  }
  
  .footer-text {
    color: #303134;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  
  .footer-text p {
    margin-left: 10px;
  }
  </style>