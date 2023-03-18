<template>
  <div class="container">
  <div v-for="(day, index) in days" :key="index" class="row mb-5 card">
      <div v-if="day.activities.length === 0">
        <div class="row h3 p-4 text-white bg-secondary">{{ day.day }}</div>
        <div class="row p-5 text-center">
          <div class="h4">Sorry! </div>
          <div class="h5">No plans for the day.</div>
        </div>
      </div>
      <div v-else>
        <div class="row h3 p-4 text-white bg-secondary">{{ day.day }}</div>
        <div class="row">
          <div v-for="(activity, index) in day.activities" :key="index" 
              class="col-4 card m-2" style="width: 18rem; flex-wrap: nowrap;">
              <div class="card-body">
                <h5 class="card-title">{{ activity }}</h5>
                <!-- <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p class="card-text">{{ activity }}</p> -->
                <!-- <a href="#" class="card-link">Why?</a> -->
              </div>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
  name: "TravelPlans",
  props: {
    days: {
      type: Array,
      required: true
    }
  }
};
</script>
