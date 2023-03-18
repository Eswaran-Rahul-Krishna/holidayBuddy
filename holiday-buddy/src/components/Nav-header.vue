<template>
  <nav>
    <div>
      <img src="../assets/logo.png" style="height: 57px;width: 100px;"/>

      <div v-if="isLogin" class="login">
        <Avatar :src="user.photoURL" />
        <button
          class="text-gray-400 hover:text-white"
          @click="singOutAndNavigate"
        >
          Sign Out
        </button>
      </div>

      <!-- <button v-else class="bg-green-500 hover:bg-green-600" @click="signIn">
        Sign in
      </button> -->
    </div>
  </nav>
</template>

<script>
import Avatar from './avatarIcons.vue'
import { useAuth } from '../firebase/init.js'

export default {
  components: { Avatar },
  setup() {
    const { user, isLogin, signOut, signIn } = useAuth()
    return { user, isLogin, signOut, signIn }
  },
  methods: {
    async singOutAndNavigate() {
      await useAuth().signOut()

      this.$router.push({ path: '/' })
    }
  }
}
</script>
