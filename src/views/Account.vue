<template>
  <Nav />
  <img :src="avatar_url" v-if="avatar_url" alt="Profile picture" />
  <!-- <form v-if="inputUpdateAvatar" action=""> -->
    <input @change="fileManager" type="file" />
    <button @click="uploadFile">Upload File</button>
      <!-- </form>
  <button v-if="!inputUpdateAvatar" @click="editToggleAvatar">Change Avatar</button> -->
  
  <h1>Name: {{ username }}</h1>
  <h1>
    Website: <a target="_blank" :href="website">{{ website }}</a>
  </h1>
  <h1>Location: {{ location }}</h1>
  <h1>Byography: {{ bio }}</h1>

  <Profile @updateProfileEmit="hundleUpdateProfile" />
</template>

<script setup>
  import { supabase } from '../supabase'
  import Profile from '../components/Profile.vue'
  import { onMounted, ref, toRefs, watch } from 'vue'
  import { useUserStore } from "../stores/user";
  import Nav from '../components/Nav.vue';
import Swal from 'sweetalert2';

  const userStore = useUserStore();

  const loading = ref(false);
  
  const username = ref(null);
  const website = ref(null);
  const avatar_url = ref(null);
  const location = ref(null);
  const bio = ref(null);

  const avatarFile = ref();
  const avatarfileUrl = ref();
  const inputUpdateAvatar = ref(false);

  const editToggleAvatar = () => {
    inputUpdateAvatar.value = !inputUpdateAvatar.value;
  };

  const fileManager = (event) => {
    avatarFile.value = event.target.files[0];
  };

  const hundleUpdateProfile = (updatedProfileData) => {
    username.value = updatedProfileData.full_name;
    website.value = updatedProfileData.website;
    location.value = updatedProfileData.location;
    bio.value = updatedProfileData.bio;
    avatar_url = updatedProfileData.avatar_url;
  };

  const uploadFile = async () => {
    if (!avatarFile.value) return;

    const { data } = await supabase
    .from('profiles')
    .select('avatar_url')
    .eq('user_id', supabase.auth.user().id);

    const deleteUrl =  data[0].avatar_url;
    const { error: urlDeleteError } = await supabase.storage
    .from('profile-img')
    .remove([deleteUrl]);

    if (urlDeleteError) {
      console.error(`Error while deleting file ${urlDeleteError}`);
      return;
    }
    Swal.fire({
      text: "File uploaded Succesfully",
      icon: "success",
      confirmButtonText: 'Ok!',
      confirmButtonColor: '#3085d6',
    });

    const timestamp = Date.now();
    const filePath = `profiles/${timestamp} -${avatarFile.value.name}`;
      const { error: uploadError } = await supabase.storage
      .from('profile-img')
      .upload(filePath, avatarFile.value);
    if (uploadError) {
      console.error(`Error uploading file: ${uploadError}`);
      return;
    }

    avatarfileUrl.value = urlData.publicURL;
    console.log(avatarfileUrl.value);

    const { error: updateError } = await supabase
    .from('profiles')
    .update({ avatar_url: avatarfileUrl.value })
    .eq('user_id', supabase.auth.user().id);

    if (updateError) {
      console.error(`Error updating profile: ${updateError}`);
      return;
    }
    Swal.fire({
      text: "Profile successfully updated",
      icon: "success",
      confirmButtonText: 'Ok!',
      confirmButtonColor: '#3085d6',
    });

    await userStore.fetchUser();
    editToggleAvatar();
  };
 
  // async function getProfile() {
  //   await userStore.fetchUser();
  //   username.value = userStore.profile.username;
  //   avatar_url.value = userStore.profile.avatar_url;
  // }

  async function getProfile() {
  await userStore.fetchUser();
  username.value = userStore.profile.full_name;
  website.value = userStore.profile.website;
  location.value = userStore.profile.location;
  bio.value = userStore.profile.bio;
  avatar_url.value = userStore.profile.avatar_url;
  }

  watch(
    () => userStore.profile,
    (updatedProfileData) =>{
        // username.value = updatedProfileData.full_name;
        // website.value = updatedProfileData.website;
        // location.value = updatedProfileData.location;
        // bio.value = updatedProfileData.bio;
        avatar_url.value = updatedProfileData.avatar_url;
  },
  { deep: true }

  )

  onMounted(() => {
    getProfile();
  });



  // async function signOut() {
  //   try {
  //     loading.value = true
  //     let { error } = await supabase.auth.signOut()
  //     if (error) throw error
  //   } catch (error) {
  //     alert(error.message)
  //   } finally {
  //     loading.value = false
  //   }
  // }
</script>

<style>
img {
  width: 200px;
  border-radius: 50%;
}
</style>