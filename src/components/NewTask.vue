<template>
<div class="container">
    <div class="card-3d-wrap m-auto">
        <div class="card-3d-wrapper">
            <div class="card-front">
                <div class="center-wrap">
                    <div class="section text-center">
                        <h4 class="mb-4 pb-3">Add a New Task</h4>
                        <div v-if="showErrorMessage">
                            <p class="error-text">{{ errorMessage }}</p>
                        </div>
                        <div class="form-group">
                            <input class="form-style" type="text" placeholder="Add a Task Title" v-model="name">
                        </div>	
                        <div class="form-group mt-2">
                            <input class="form-style" type="text" placeholder="Add a Task Description" v-model="description">
                        </div>
                        <button @click="addTask" class="btn mt-4">Add task</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task"   

const taskStore = useTaskStore();

// const var to save inputs values
const name = ref('');
const description = ref('');

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

// Arrow function para crear tareas.
const addTask = () => {
if(name.value.length === 0 || description.value.length === 0){
    // We first check that no input field is empty and throw the error with a timeout to inform the user.

    showErrorMessage.value = true;
    errorMessage.value = 'The task title or description is empty';
    setTimeout(() => {
    showErrorMessage.value = false;
    }, 5000);

} else {
// Here we send the values to the store to create the new Task. This part of the function needs to be refactored so that it works with emit and the store's addTask is called from Home.vue.

    taskStore.addTask(name.value, description.value);
    name.value = '';
    description.value = '';
}
};

</script>

<style scoped>

p {
  font-weight: 500;
  font-size: 14px;
  line-height: 1.7;
}
h4 {
  font-weight: 600;
  color:#c4c3ca;
}
.section{
  position: relative;
  width: 100%;
  display: block;
}
.card-front {
  width: 100%;
  height: 100%;
  background-color: #33343d;
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 300%;
  position: absolute;
  border-radius: 6px;
  left: 0;
  top: 0;

}
.card-3d-wrap {
  position: relative;
  width: 440px;
  max-width: 100%;
  height: 350px;
  perspective: 800px;
  margin-top: 60px;
}
.card-3d-wrapper {
  width: 100%;
  height: 100%;
  position:absolute;    
  top: 0;
  left: 0;  
  transition: all 600ms ease-out; 
}
.center-wrap{
  position: absolute;
  width: 100%;
  padding: 0 35px;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 35px) perspective(100px);
  z-index: 20;
  display: block;
}
.form-group{ 
  position: relative;
  display: block;
    margin: 0;
    padding: 0;
}
.form-style {
  padding: 13px 20px;
  padding-left: 55px;
  height: 48px;
  width: 100%;
  font-weight: 500;
  border-radius: 4px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.5px;
  outline: none;
  color: #c4c3ca;
  background-color: #1f2029;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
}
.form-style:focus,
.form-style:active {
  border: none;
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
}

.form-group input:-ms-input-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
}
.form-group input::-moz-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
}
.form-group input:-moz-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;

}
.form-group input::-webkit-input-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
}

.btn{  
  border-radius: 4px;
  height: 44px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 0 30px;
  letter-spacing: 1px;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: none;
  background-color: #ffeba7;
  color: #102770;
  box-shadow: 0 8px 24px 0 rgba(255,235,167,.2);
}
.btn:active,
.btn:focus{  
  background-color: #102770;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}
.btn:hover{  
  background-color: #102770;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}

@media (max-width: 990px) {
.card-3d-wrap {
  position: relative;
  width: 340px;
  max-width: 100%;
  height: 300px;
  perspective: 800px;
  margin-top: 50px;
}

}


</style>
  