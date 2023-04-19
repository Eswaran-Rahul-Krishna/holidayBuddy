<template>
  <div class="message">
    <span >Buddy</span>
    <div class="flex">
      <Avatar class="mt-1" src="https://media0.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif?cid=ecf05e47n7lwku1vxtaln9yvhza2r3aih4u6jd60bmy72slm&rid=giphy.gif&ct=g" />
      <div class="text w-3/4 bg-gray-700">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './avatarIcons.vue'
export default {
  components: { Avatar },
}
</script>
