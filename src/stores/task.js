import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";
import Swal from "sweetalert2";

//function to define task store
export const useTaskStore = defineStore("tasks", () => {
  // this store uses the composition API
  const tasksArr = ref(null);

  // get tasks from supabase
  const fetchTasks = async () => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: false });
    tasksArr.value = tasks;
    return tasksArr.value;
  };

  // add tasks to supabase
  const addTask = async (title, description) => {
    console.log(useUserStore().user.id);
    const { data, error } = await supabase.from("tasks").insert([
      {
        user_id: useUserStore().user.id,
        title: title,
        is_complete: false,
        description: description,
      },
    ]);
  await fetchTasks();                           //call the function
  };

  // Update task in supabase
  const updateTask = async (id, title, description) => {
    const {data, error} = await supabase
      .from("tasks")
      .update([
        { user_id: useUserStore().user.id,
          title: title,
          description: description,
          is_complete: false,
        },
      ])
      .eq("id", id);
    await fetchTasks();                       //call the function 
  };

  // delete tasks from supabase
  const deleteTask = async (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'this action cannot be undone',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'cancel',
        cancelButtonColor: '#aaa',
        confirmButtonText: 'Yes, do it!',
        confirmButtonColor: '#3085d6',
      }).then(async (result) => {
        if (result.isConfirmed) {
    const { data, error } = await supabase
    .from("tasks")
    .delete()
    .match({
      id: id,
    });

    await fetchTasks();
    Swal.fire({
      title: 'Deleted',
      text: 'Your task has been deleted',
      icon: 'success',
        });
      }
    });
};

  //Complete task in supabase
  const completeTask = async (id, booleanValue) => {
    const {data, error} = await supabase
    .from("tasks")
    .update({
      is_complete: booleanValue
    })
    .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }
      await fetchTasks();
  }

  //return all functions
  return { tasksArr, fetchTasks, addTask, updateTask, deleteTask, completeTask };
});
