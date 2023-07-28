<template>
  <div class="container">
    <div class="row">
      <button class="button btn-primary btn-block mb-4" @click="editToggleProfile">Edit Profile</button>
      <form v-if="inputUpdate">
        <label for="name" class="form-label">Full name</label>
        <input class="form-control" v-model="profile.full_name" placeholder="Full name" type="text" id="name"/>
        <label for="biography" class="form-label">Biography</label>
        <textarea class="form-control" v-model="profile.bio" placeholder="Biography" type="text-area" id="biography"></textarea>
        <label for="web" class="form-label">Website</label>
        <input class="form-control" v-model="profile.website" placeholder="Website" type="text" id="web"/>
        <label for="location" class="form-label">Location</label>
        <input class="form-control" v-model="profile.location" placeholder="Location" type="text" id="location" />
        <button class="button btn-primary mt-3" type="button" @click="updateProfile">Save Changes</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useUserStore } from "../stores/user";
import { supabase } from "../supabase";

const userStore = useUserStore();

const emit = defineEmits(["updateProfileEmit"])

const props = defineProps({
  profile: {
    type: Object,
  },
  inputUpdate: {
    type: Boolean,
  },
});

//para el padre

const inputUpdate = ref(false);

const editToggleProfile = () => {
  inputUpdate.value = !inputUpdate.value;
};

const profile = computed(() => (userStore.profile ? userStore.profile : {}));

const updateProfile = async () => {
  const updatedProfileData = {
    full_name: profile.value.full_name,
    bio: profile.value.bio,
    location: profile.value.location,
    website: profile.value.website,
  };
  console.log(updatedProfileData);
  const { data, error } = await supabase
    .from("profiles")
    .update(updatedProfileData)
    .eq("user_id", supabase.auth.user().id);
    editToggleProfile()
  if (error) {
    console.error(error);
  } else {
    console.log("Perfil actualizado correctamente");
    emit('updateProfileEmit', updatedProfileData)
  }

};

onMounted(async () => {
  await userStore.fetchUser();
});
</script>

<style scoped>

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
  transition: all 0.2s ease;
}

</style>