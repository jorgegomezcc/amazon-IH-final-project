<template>

  <div class="wrapper">
    <Nav />
    <div class="content">
      <div id="clock-date">
      <p>{{ currentTime }}</p>
      <p>{{ currentDay }}</p>
      </div>
    </div>
    <NewTask />
    <h1 class="m-4 text-center">Tasks:</h1>

    <div class="grid-container">
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useTaskStore } from "../stores/task";
import Nav from '../components/Nav.vue';
import NewTask from '../components/NewTask.vue';
import TaskItem from '../components/TaskItem.vue';
import { format } from 'date-fns';
import moment from "moment";
import Footer from '../components/Footer.vue'

const taskStore = useTaskStore();

//const fome save time sets
const currentTime = ref("");
const currentDay = ref("");

//Function to update the time
const updateCurrentTime = () => {
  currentTime.value = moment().format("k:mm:ss");
};

const updateCurrentDay = () => {
  currentDay.value = moment().format("ddd, D MMM");
};

//call the function every second for update the time
setInterval(updateCurrentTime, 1000);

//call the day function
updateCurrentDay();

const tasks = computed(() => taskStore.tasksArr);
// console.log("taskComputed:", tasks.value);

const fechaFormateada = ref('');

onMounted(async () => {
  await taskStore.fetchTasks();
  // console.log("taskOnmouted:", tasks.value);
});

</script>


<style scoped>
.wrapper{
	font-family: 'Poppins', sans-serif;
	font-weight: 300;
	font-size: 15px;
	line-height: 1.7;
	color: #c4c3ca;
	background-color: #1f2029;
	overflow-x: hidden;
}

.grid-container {
  justify-content: space-around;
  display: grid;
  grid-template-columns: repeat(auto-fill, 340px);
  grid-auto-rows: auto;
  grid-gap: 5px;
}

#clock-date {
  display: flex;
  justify-content: space-between;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 3.5rem;
}

#clock-date p {
  color: #c4c3ca;
  font-size: 2rem;
}

@media (max-width: 990px) {
 
 #clock-date{
  display: flex;
  justify-content: space-between;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 0rem;
  margin-bottom: 0rem;
 }

}
</style>