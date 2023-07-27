<template>
      <Nav />
  <div class="wrapper">

    <div class="content">
      <div id="clock-date">
      <p>{{ currentTime }}</p>
      <p>{{ currentDay }}</p>
      </div>
    </div>
    <NewTask />
    <h1>Tasks:</h1>

    <div class="grid-container">
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
    </div>

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

const taskStore = useTaskStore();

//const donde podemos guardar el tiempo
const currentTime = ref("");
const currentDay = ref("");

//funcion para actualizar el tiempo
const updateCurrentTime = () => {
  currentTime.value = moment().format("k:mm:ss");
};

const updateCurrentDay = () => {
  currentDay.value = moment().format("ddd, D MMM");
};

//lamamos funcion cada segundo para actulizar el timepo
setInterval(updateCurrentTime, 1000);

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
*{
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
  margin: 3rem;
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
 }

}
</style>