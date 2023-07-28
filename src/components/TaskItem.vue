<template>
  <div class="container">
  <div class="card-deck">
    <div class="card bg-secondary mb-3">
      <div class="card-header text-center" :class="{ completed: task.is_complete }">
        <h5 class="taskStatus" :class="{ completed: task.is_complete }">
          {{ task.is_complete ? "Task completed" : "Pending Task" }}
        </h5>

      </div>
      <div class="card-body text-center">
        <h5 class="taskTitle" :class="{ completed: task.is_complete }">{{task.title}}</h5>
        <p class="taskDescription" :class="{ completed: task.is_complete }">
          {{ task.description }}
        </p>
        <div class="taskButtons">
          <button
          class="doneBtn"  
          :class="{ completed: task.is_complete }"
            @click="toggleComplete"
          >
            <i class="fa fa-check fa-2x"></i>
            {{ task.is_complete ? "" : "" }}
          </button>
          <button @click="UpdateToggle" class="updateBtn">
            <i class="fa fa-pencil fa-2x"></i>
          </button>
          <button @click="deleteTask" class="deleteBtn">
            <i class="fa fa-trash-o fa-2x"></i>
          </button>
        </div>
        <div>
          <form
            v-if="inputUpdate && task.id === selectedTaskId"
            class="update-form text-center"
          >
            <input
              type="text"
              v-model="name"
              class="titleInput"
              placeholder="New Title"
            />
            <textarea
              type="text"
              v-model="description"
              class="descInput"
              placeholder="New Description"
            >
            </textarea>
            <button @click="updateTask" class="saveBtn">Update task</button>
            <p v-if="error" class="error-message">{{ error }}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue';
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";

const taskStore = useTaskStore();
const name = ref("");
const description = ref("");
const props = defineProps({
  task: Object,
});
const selectedTaskId = ref(null);
const tasks = ref([]);

const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
};

//reactive reference called inputUpdate with an initial value of false.
const inputUpdate = ref(false);

// function to change the value of the reactive reference inputUpdate
const UpdateToggle = () => {
  inputUpdate.value = !inputUpdate.value;
  selectedTaskId.value = props.task.id;
};

// Function to update a taks in taskstore with the new values
const updateTask = () => {
  taskStore.updateTask(props.task.id, name.value, description.value);
  name.value = "";
  description.value = "";
  UpdateToggle();
};

// Function to toogle completed or incomplete a task
const toggleComplete = () => {
  props.task.is_complete = !props.task.is_complete;
  taskStore.completeTask(props.task.id, props.task.is_complete);
};
</script>


  <style scoped>
.taskStatus {
  color: #c4c3ca;
}

.taskStatus.completed{
  color: #33343d;
}

.taskTitle.completed {
  text-decoration: line-through;
  overflow: hidden;
  text-overflow: ellipsis;
}

.taskDescription.completed {
  text-decoration: line-through;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-header.completed {
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
  background-color: #C9E465;
  background-position: center;
  background-size: cover;
}

.card-header {
  background-color: #33343d;
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
  background-position: center;
}

.doneBtn.completed {
  background-color: #C9E465;
}

.update-form {
  margin-top: 30px;
}

.saveBtn {
  background-color: #C9E465;
  color:white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.saveBtn:hover {
  background-color: #102770;
}
.card {
  position: relative;
  width: 300px;
  background-color: #c4c3ca;
}
.taskButtons {
  display: flex;
  justify-content: space-around;
}

.doneBtn {
  text-decoration: underline;
  height: 50px;
  width: 50px;
  background-color: #ffeba7;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
.updateBtn {
  height: 50px;
  width: 50px;

  background-color: #102770;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
.deleteBtn {
  height: 50px;
  width: 50px;
  background-color: #ff0000d1;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.titleInput {
  height: 30px;
  width: 250px;
  margin-bottom: 10px;
  margin-top: 0px;
}
.descInput{
  width: 250px;
  margin-bottom: 15px;
}
</style>
  