<template>
  <div class="container sign-in bg-white">
    <div class="row">
      <div class="col">
        <img src="../../assets/logo.png"/>
      </div>
      <div class="col text-white" style="background-color: #270949;">
        <div class="my-4 mx-5">
          <div class="row my-5 align-items-center">
            <div class="py-4" style="margin-top: auto; margin-bottom: auto;">
              <div class="h3 mb-4">Welcome</div>
              <div>Pack your bags, it's time to explore! Whether you're a globe-trotting pro or a first-time adventurer, we've got your back. Let's venture into the unknown, buckle up and go on an adventure together!</div>
              <div class="mt-4">
                <button class="btn btn-primary px-5" @click="signInToApp">
                  <i class="fas fa-sign-in-alt"></i> Sign In
                </button>
              </div>
            </div>
          </div>
          <div class="row align-items-end">
              <div>info@apexon.com</div>
              <div>079-67771222</div>
          </div>
        </div>
      </div>
    </div>
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
.sign-in {
  margin-top: 4rem;
}
</style>
