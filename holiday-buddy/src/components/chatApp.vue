<template>
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
        <input v-model="message" placeholder="Message" required />
        <button type="submit">
          <SendIcon />
        </button>

        <button class="ask-buddy" @click="askBuddy">Ask Buddy</button>

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

export default {
  components: { Message, SendIcon },
  setup() {
    const { user, isLogin } = useAuth()
    const { messages, sendMessage,sendAssistantMessage } = useChat()

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

    return { user, isLogin, messages, bottom, message, send, askBuddy }
  }
}
</script>

<style scoped>

.ask-buddy {
  background: #ac806f;
}

.ask-buddy {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #ac806f;
  cursor: pointer;
  transition: all 0.3s ease;
}

.ask-buddy:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}


</style>
