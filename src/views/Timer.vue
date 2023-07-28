<template>
  <div class="wrapper">
    <Nav />
    
    <div id="clock-date">
      <p>{{ currentTime }}</p>
      <p>{{ currentDay }}</p>
    </div>

    <div class="add-timer-title text-center">
        <h1>Keed focused</h1>
        <p class="add-timer-text">Keep your time organized!</p>
    </div>

    <div class='content'>

      <button v-if="!played" class="button" @click="played = true">
        Start
      </button>
      <button v-if="played" class="button" @click="played = false">
        Pause
      </button>

      <div v-if="!played" class="timer-form">
        <h1 class="timer-display">{{ minutes }} : {{ seconds }}</h1>
      </div>

      <div class="timer-container">
        <div v-if="played" class="timer-counter">
          <h1 class="timer-display">{{ minutes }} : {{ seconds }}</h1>
        </div>
      </div>



      <div class="buttons-set-timer">

        <button class="button" @click="setTimer('pomodoro')">Pomodoro
        </button>

        <button class="button" @click="setTimer('shortBreak')">
          Short Break
        </button>

        <button class="button" @click="setTimer('longBreak')">
          Long Break
        </button>

      </div>

    </div>

    <Footer />
  </div>
</template>

<script setup>
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
import buttonSong from "../assets/sounds/music.mp3";
import alertSound from "../assets/sounds/alert.mp3";
import { ref } from "vue";
import moment from "moment";

//const to save the time sets
const currentTime = ref("");
const currentDay = ref("");

//Function to update the time
const updateCurrentTime = () => {
  currentTime.value = moment().format("k:mm:ss");
};

const updateCurrentDay = () => {
  currentDay.value = moment().format("ddd, D MMM");
};

//Call the function for update the tima
setInterval(updateCurrentTime, 1000);

//call the day function
updateCurrentDay();


//const var to save the sounds
const btnSong = new Audio(buttonSong);
const alert = new Audio(alertSound);
const played = ref(false);

const minutes = ref(24);
const seconds = ref(59);

//we stop the counter by changing the state of the played variable
const stopTimer = () => {
  played.value = false;
  alert.play();
  btnSong.pause();
  clearInterval(timer);
};

//timer which indicates the number of minutes and seconds corresponding to each of the states
const setTimer = (type) => {
  if (type === "pomodoro") {
    minutes.value = 24;
    seconds.value = 59;
    stopTimer();
  } else if (type === "shortBreak") {
    minutes.value = 4;
    seconds.value = 59;
    stopTimer();
  } else {
    minutes.value = 14;
    seconds.value = 59;
    stopTimer();
  }
};

//we update the counter by means of the function setInterval every second updating the minute and second values.
const timer = () => {
  if (!(seconds.value === 0 && minutes.value === 0) && played.value) {
    played.value = true;
    seconds.value--;
    if (seconds.value === 0 && minutes.value !== 0) {
      minutes.value--;
      seconds.value = 59;
    }

    if (minutes.value === 0 && seconds.value === 0) {
      played.value = false;
      btnSong.pause();
      stopTimer();
    }
  }
};

setInterval(timer, 1000);
</script>

<style scoped>

*{
	font-family: 'Poppins', sans-serif;
	font-size: 15px;
	background-color: #1f2029;
}

.wrapper {
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: #c4c3ca;
}

#clock-date {
  display: flex;
  justify-content: space-between;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 3.5rem;
}

#clock-date p {
  font-size: 2rem;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 auto;
}

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

.button:hover {
  background-color: #102770;
  font-weight: 700;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}

.timer-display {
  font-size: 90px;
}

.add-timer-title h1 {
  font-size: 60px;
  padding-top: 15px;
}

.add-timer-title h2 {
  font-size: 40px;
  padding-top: 15px;
}


.add-timer-text {
  font-weight: 700;
}

.add-timer-text:last-child {
  margin-bottom: 40px;
}

.buttons-set-timer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
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