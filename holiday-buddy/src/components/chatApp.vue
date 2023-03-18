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

        <button class="btn btn-primary" @click="askBuddy" style="padding: 7px 36px;">Ask Buddy</button>

        <button class="ml-3 btn btn-outline-success" @click="navigateToTravelGuide">Get Travel Details</button>
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

export default {
  components: { Message, SendIcon, Nav },
  setup() {
    const { user, isLogin } = useAuth()
    const { messages, sendMessage,sendAssistantMessage } = useChat()
    const router = useRouter()

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

     await  axios.post('https://call-chat-gpt.azurewebsites.net/api/TravelDecider?code=IoqmIMn6EoviomHN4NytkpEgNkRgIcDYc8v8ggRjLhIqAzFuEYktlw==', messages._rawValue).then((response) => {
       // console.log(response.data)
         sendAssistantMessage(response.data)
      })
  .catch(error => {
    console.error(error);
  });
    }

    const navigateToTravelGuide = async () => {
      sessionStorage.setItem("Messages", messages._rawValue);
        await  axios.post('https://call-chat-gpt.azurewebsites.net/api/GetTravelItinerary?code=mKnycowDm697fLtP8j6BvbRQ5YWY1kZOvArcLgY-PvhFAzFulje9HQ==', messages._rawValue).then((response) => {
         // console.log(response.data)
        sessionStorage.setItem("TravelDetailsMetaData", JSON.stringify(response.data));
       sessionStorage.setItem("Messages",JSON.stringify( messages._rawValue));

        }).catch(error => {
           console.error(error);
          });
      
        const data = sessionStorage.getItem("Messages");
        console.log(data)
        axios.post('https://call-chat-gpt.azurewebsites.net/api/PdfGenerator?code=H3wsbu7iuGmuecZXvOPvY-YrmuV8D4_L6jBHS__m-f09AzFuYBGMvg==',data).then((response) => {
        console.log(response.data)
        sessionStorage.setItem("ExportPdfHtml", response.data);
        
      }).catch(error => {
    console.error(error);
  });
        
        router.push({ path: "/travel-guide" });
    }

    return { user, isLogin, messages, bottom, message, send, askBuddy, navigateToTravelGuide}
  }
}
</script>
