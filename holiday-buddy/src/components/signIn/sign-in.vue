<template>
  <div class="travel-signin-container">
    <div class="animation-container">
      <i
        class="fas fa-plane travel-icon"
        :class="{ 'bounce-animation': bounce }"
      ></i>
    </div>
    <button class="signin-button" @click="signInToApp">
      <i class="fas fa-sign-in-alt"></i> Sign In
    </button>
  </div>
</template>

<script>
import { useAuth } from '../../firebase/init.js'

export default {
  setup() {
   
    const { user, isLogin, signOut, signIn } = useAuth()
    return { user, isLogin, signOut, signIn }
  },
  data() {
    return {
      bounce: false
    }
  },
  methods: {
    async signInToApp() {
      await useAuth().signIn()
      if (useAuth().isLogin) {
        this.$router.push({ path: '/chat' })
      }
    },
    startBounceAnimation() {
      this.bounce = true
      setTimeout(() => {
        this.bounce = false
      }, 1000)
    }
  },
  mounted() {
    this.startBounceAnimation()
  }
}
</script>

<style scoped>
.travel-signin-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.animation-container {
  margin-bottom: 50px;
}

.travel-icon {
  font-size: 5rem;
}

.bounce-animation {
  animation-name: bounce;
  animation-duration: 1s;
}

.signin-button {
  padding: 1rem 2rem;
  font-size: 1.5rem;
  border-radius: 5px;
  background-color: #1abc9c;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.signin-button:hover {
  background-color: #16a085;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
