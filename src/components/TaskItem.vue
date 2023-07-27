<template>
  <div class="container">
  <div class="card-deck">
    <div class="card bg-secondary mb-3">
      <div class="card-header text-center" :class="{ completed: task.is_complete }">
        <span class="title" :class="{ completed: task.is_complete }">{{task.title}}</span>
      </div>
      <div class="card-body text-center">
        <h5 class="card-title" :class="{ completed: task.is_complete }">
          {{ task.is_complete ? "Task completed" : "Task incompleted" }}
        </h5>
        <p class="card-text" :class="{ completed: task.is_complete }">
          {{ task.description }}
        </p>
        <div class="icons">
          <button
          class="boton-complete"  
          :class="{ completed: task.is_complete }"
            @click="toggleComplete"
          >
            <i class="fa fa-check fa-2x"></i>
            {{ task.is_complete ? "" : "" }}
          </button>
          <button @click="deleteTask" class="boton-delete">
            <i class="fa fa-trash-o fa-2x"></i>
          </button>
          <button @click="UpdateToggle" class="boton-update">
            <i class="fa fa-pencil fa-2x"></i>
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
              class="input1"
              placeholder="New Title"
            />
            <textarea
              type="text"
              v-model="description"
              class="input2"
              placeholder="New Description"
            >
            </textarea>
            <button @click="updateTask" class="boton-save">Update task</button>
            <p v-if="error" class="error-message">{{ error }}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<!-- ===================== COMIENZA EL SCRIPT ================================= -->

<script setup>
import { ref, defineProps } from "vue";
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

// Esta línea de código crea una referencia reactiva llamada inputUpdate con un valor inicial de false. Esta referencia se puede utilizar para realizar un seguimiento del estado de actualización de un input en una aplicación y activar o desactivar ciertas funcionalidades o comportamientos según el valor de inputUpdate.
const inputUpdate = ref(false);

// Esta función UpdateToggle se utiliza para cambiar el valor de la referencia reactiva inputUpdate y asignar el ID de la tarea a la referencia reactiva selectedTaskId.
const UpdateToggle = () => {
  inputUpdate.value = !inputUpdate.value;
  selectedTaskId.value = props.task.id;
};

// Esta función updateTask se utiliza para actualizar una tarea en taskStore con los nuevos valores del nombre y la descripción. Luego, se restablecen los valores del nombre y la descripción a cadenas vacías, y se llama a UpdateToggle para realizar alguna acción adicional relacionada con la actualización de la tarea.
const updateTask = () => {
  taskStore.updateTask(props.task.id, name.value, description.value);
  name.value = "";
  description.value = "";
  UpdateToggle();
};

// Esta función toggleComplete se utiliza para alternar el estado de completitud de una tarea entre completa e incompleta. Actualiza el valor de la propiedad is_complete de la tarea en props y luego llama a taskStore.completeTask() para reflejar ese cambio en taskStore.
const toggleComplete = () => {
  props.task.is_complete = !props.task.is_complete;
  taskStore.completeTask(props.task.id, props.task.is_complete);
};
</script>


<!-- ================= STYLES TASKITEM ======================================= -->


  <style scoped>
.card-header.completed {
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
  background-image: url('https://png.pngtree.com/thumb_back/fh260/background/20210824/pngtree-yellow-green-background-stock-images-wallpaper-image_769660.jpg');
  background-position: center;
  background-size: cover;
}

.card-header {
  background-color: #33343d;
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
  background-position: center;
}

/* .imagen-titulo-card {
  margin-right: 0.5rem;
  height: 40px;
  width: 40px;
  transition: transform 0.3s;
}

.imagen-titulo-card:hover {
  transform: scale(1.2);
} */

.card-text.completed {
  text-decoration: line-through;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.boton-complete.completed {
  background-color: #1c881c;
}

.input1 {
  height: 30px;
  width: 250px;
  margin-bottom: 10px;
  margin-top: 0px;
}
.input2 {
  width: 250px;
  margin-bottom: 15px;
}

.update-form {
  margin-top: 30px;
}

.boton-save {
  background-color: #a504b7;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.boton-save:hover {
  background-color: #cb53d8;
}
.card {
  position: relative;
  /* justify-content: space-around; */
  width: 300px;
  background-color: #c4c3ca;
}
.icons {
  display: flex;
  justify-content: space-around;
}

.boton-complete {
  text-decoration: underline;
  height: 50px;
  width: 50px;
  background-color: #afafaf;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
.boton-update {
  height: 50px;
  width: 50px;

  background-color: #102770;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
.boton-delete {
  height: 50px;
  width: 50px;
  background-color: #ff0000d1;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
</style>
  