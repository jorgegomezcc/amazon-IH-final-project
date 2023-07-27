<template>

  <div class="page-content page-container" id="page-content">

    <Nav />
    <div class="padding">

      <div class="row container d-flex justify-content-center">

        <div class="col-xl-6 col-md-12">

          <div class="card user-card-full" id="card-block-container">

            <div class="row m-l-0 m-r-0" >

              <div class="col-md-4 user-profile">

                <div class="card-block text-center text-white">

                  <div class="m-b-25">
                    <img :src="avatar_url" v-if="avatar_url" class="img-radius" alt="User-Profile-Image" >
                    <button class="btn btn-primary m-2" @click="editToggleAvatar">Edit Avatar</button>
                      <div v-if="inputUpdateAvatar">
                        <input  @change="fileManager" type="file" />
                        <button class="btn btn-primary btn-block mb-4" @click="uploadFile">Upload File</button>
                      </div>
                  </div>

                    <h6 class="f-w-600">{{ username }}</h6>
                    

                </div>

              </div>

              <div class="col-sm-8">

                <div class="card-block">
                  
                  <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>

                  <div class="row">

                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Full Name</p>
                        <h6 class="text-muted f-w-400">{{ username }}</h6>
                      </div>

                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Location</p>
                        <h6 class="text-muted f-w-400">{{ location }}</h6>
                      </div>

                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Bio</p>
                       <h6 class="text-muted f-w-400">{{ bio}}</h6>
                     </div>

                     <div class="col-sm-6">
                       <p class="m-b-10 f-w-600">Website</p>
                       <h6 class="text-muted f-w-400"><a target="_blank" :href="website">{{ website }}</a></h6>
                     </div>

                     <Profile @updateProfileEmit="hundleUpdateProfile" />

                  </div>
                    
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>


</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs, watch } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import Profile from "../components/Profile.vue";
import Swal from 'sweetalert2';

const userStore = useUserStore();
const username = ref(null);
const website = ref(null);
const location = ref(null);
const bio = ref(null);
const file = ref();
const fileUrl = ref();
const inputUpdateAvatar = ref(false);
const avatar_url = ref(null);


const editToggleAvatar = () => {
  inputUpdateAvatar.value = !inputUpdateAvatar.value;
};

const fileManager = (event) => {
  file.value = event.target.files[0];
  console.log(event);
  console.log(file.value);
};

const hundleUpdateProfile = (updatedProfileData) => {
  username.value = updatedProfileData.full_name;
  website.value = updatedProfileData.website;
  location.value = updatedProfileData.location;
  bio.value = updatedProfileData.bio;
  avatar_url.value = updatedProfileData.avatar_url;
};

const uploadFile = async () => {
  if (!file.value) {
    console.log("aqui llego");
    return;
  }
  const { data } = await supabase
        .from('profiles')
        .select("avatar_url")
        .eq("user_id", supabase.auth.user().id);

  const deleteUrl = data[0].avatar_url;
  // console.log(deleteUrl);
  const { error: urlDeleteError } = await supabase.storage
    .from("profile-img")
    .remove([deleteUrl]);

  if (urlDeleteError) {
    console.error("Error deleting file:", urlDeleteError);
    return;
  }
  console.log("File succesfully upload.");

  const timestamp = Date.now();
  const filePath = `profiles/${timestamp}-${file.value.name}`;
  const { error: uploadError } = await supabase.storage
    .from("profile-img")
    .upload(filePath, file.value);
  if (uploadError) {
    console.error("Error uploading file:", uploadError);
    return;
  }
  console.log("File succesfully upload.");

  const { data: urlData, error: urlError } = await supabase.storage
    .from("profile-img")
    .getPublicUrl(filePath);
  console.log(urlData);
  if (urlError) {
    console.error("Error getting public URL:", urlError);
    return;
  }

  fileUrl.value = urlData.publicURL;
  console.log(fileUrl.value);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: fileUrl.value })
    .eq("user_id", supabase.auth.user().id);

  if (updateError) {
    console.error("Error updating profile:", updateError);
    return;
  }
  console.log("Profile successfully updated.");
  Swal.fire({
        icon: 'success',
        title: 'Success', 
        showConfirmButton: false,
        timer: 1000
    })
  await userStore.fetchUser();
  editToggleAvatar();
};

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
  (updatedProfileData) => {
    avatar_url.value = updatedProfileData.avatar_url;
  },
  { deep: true }
);

onMounted(() => {
  getProfile();
});

</script>

<style scoped>

 .page-content{
	font-family: 'Poppins', sans-serif;
	font-weight: 300;
	font-size: 15px;
	line-height: 1.7;
	color: #c4c3ca;
	background-color: #1f2029;
  min-height: 100vh;
  min-width: 100vw;
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  align-content: center;
}

.padding {
    padding: 3rem !important
}

.user-card-full {
    overflow: hidden;
}

.card {
    border-radius: 5px;
    -webkit-box-shadow: 0 1px 20px 0 rgba(69,90,100,0.08);
    box-shadow: 0 1px 20px 0 rgba(69,90,100,0.08);
    border: none;
    margin-bottom: 30px;
}

.m-r-0 {
    margin-right: 0px;
}

.m-l-0 {
    margin-left: 0px;
}

.user-card-full .user-profile {
  background-color: #33343d;
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 300%;
  border-radius: 6px;
}

#card-block-container{
  border-radius: 6px;
}


.user-profile {
    padding: 20px 0;
}

.card-block {
    padding: 1.25rem;
}

.m-b-25 {
    margin-bottom: 25px;
}

.img-radius {
    height: 170px;
    width: 170px;
    border-radius: 100%;
}


 
h6 {
    font-size: 14px;
}

.card .card-block p {
    line-height: 25px;
}






/* ---------------------------------------------- */
@media (max-width: 990px) {

.page-content{
  padding: 0;
  margin: 0;
}

}

</style>