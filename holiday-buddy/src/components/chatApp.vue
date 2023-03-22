<template>
 <Nav />
  <div class="container-sm mt-20">
    <div class="mx-5">
      <Message
        v-for="{ id, text, userPhotoURL, userName, userId } in messages"
        :key="id"
        :name="userName"
        :photo-url="userPhotoURL"
        :sender="userId === user?.uid"
      >
        {{ text }}
      </Message>

      <ChatTypingIndicator   v-if="isButtonDisabled">
       Buddy typing ...
      </ChatTypingIndicator>
      <ChatTypingIndicator   v-if="isNavigateButtonDisabled">
       <b>Buddy is preparing your travel itinerary...</b>
      </ChatTypingIndicator>
    </div>
  </div>

  <div ref="bottom" class="mt-20" />

  <div class="bottom">
    <div class="container-sm">
      <form v-if="isLogin" @submit.prevent="send">
        <input v-model="message" placeholder="Message" />
        <button type="submit">
          <SendIcon />
        </button>

        <button class="btn btn-primary" @click="askBuddy" style="padding: 7px 36px;" :disabled="isButtonDisabled">Ask Buddy</button>

        <button class="ml-3 btn btn-outline-success" @click="navigateToTravelGuide" :disabled="isNavigateButtonDisabled">Get Travel Details</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch, nextTick } from 'vue'
import { useAuth, useChat } from '../firebase/init.js'

import SendIcon from './SendIcon.vue'
import Message from './chatMessage.vue'
import axios from 'axios'
import { useRouter } from 'vue-router';

import Nav from '@/components/app-header/Nav-header.vue';
import ChatTypingIndicator from './chatTypingIndicator.vue';

export default {
  components: { Message, SendIcon, Nav ,ChatTypingIndicator },
  setup() {
    const { user, isLogin } = useAuth()
    const { messages, sendMessage,sendAssistantMessage } = useChat()
    const router = useRouter()
   const isButtonDisabled = ref(false);
   const isNavigateButtonDisabled = ref(false);

    const bottom = ref(null)
    watch(
      messages,
      () => {
        nextTick(() => {
          bottom.value?.scrollIntoView({ behavior: 'smooth' })
        })
      },     
      { deep: true }
    )

    const message = ref('')
    const send = async () => {
      if (message.value) {
        await sendMessage(message.value)
        message.value = ''
      }
    }

    const askBuddy = async () => {
     // console.log(messages._rawValue)
      if (message.value) {
        await sendMessage(message.value)
        message.value = ''
      }      

      isButtonDisabled.value = true;
     await  axios.post('https://call-chat-gpt.azurewebsites.net/api/TravelDecider?code=IoqmIMn6EoviomHN4NytkpEgNkRgIcDYc8v8ggRjLhIqAzFuEYktlw==', messages._rawValue).then((response) => {
       // console.log(response.data)
         sendAssistantMessage(response.data)
         isButtonDisabled.value = false;
      })
  .catch(error => {
    console.error(error);
    isButtonDisabled.value = false;
  });
    }

    const navigateToTravelGuide = async () => {
      isNavigateButtonDisabled.value = true;
      sessionStorage.setItem("Messages", messages._rawValue);
        await  axios.post('https://call-chat-gpt.azurewebsites.net/api/GetTravelItinerary?code=mKnycowDm697fLtP8j6BvbRQ5YWY1kZOvArcLgY-PvhFAzFulje9HQ==', messages._rawValue).then((response) => {
         // console.log(response.data)
        sessionStorage.setItem("TravelDetailsMetaData", JSON.stringify(response.data));
       sessionStorage.setItem("Messages",JSON.stringify( messages._rawValue));
       isNavigateButtonDisabled.value = false;
        }).catch(error => {
           console.error(error);
           isNavigateButtonDisabled.value = false;
          });
      
        
        router.push({ path: "/travel-guide" });
    }

    return { user, isLogin, messages, bottom, message, send, askBuddy, navigateToTravelGuide,isButtonDisabled,isNavigateButtonDisabled}
  }
}
</script>
