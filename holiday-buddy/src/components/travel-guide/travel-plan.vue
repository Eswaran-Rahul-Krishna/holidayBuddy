<template>
  <div class="travel-plans">
    <div class="travel-days-container">
      <div v-for="(day, index) in days" :key="index" class="travel-day">
        <div class="day-title">
          <h3>Day {{ index + 1 }}</h3>
          <div class="icon-container">
            <i class="fas fa-map-marker-alt"></i>
          </div>
        </div>
        <div class="plans">
          <div v-if="day.length === 0" class="no-plans">No plans for this day</div>
          <div v-else class="plan" v-for="(plan, index) in day" :key="index">
            <div class="time">{{ plan.time }}</div>
            <div class="details">{{ plan.details }}</div>
            <div class="icon-container">
              <i :class="plan.icon"></i>
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

<style scoped>
.travel-plans {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.travel-days-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.travel-day {
  display: flex;
  flex-direction: column;
  width: 250px;
  background-color: #f7f7f7;
  border-radius: 5px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
}

.travel-day:hover {
  transform: scale(1.1);
}

.day-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #dbdbdb;
  color: white;
  font-size: 1.2em;
}

.icon-container {
  display: flex;
  align-items: center;
}

.plan {
  display: flex;
  align-items: center;
  padding: 10px;
  transition: transform 0.3s ease-in-out;
}

.plan:hover {
  transform: scale(1.05);
}

.time {
  font-weight: bold;
  margin-right: 10px;
}

.details {
  flex: 1;
  margin-right: 10px;
}

.icon-container i {
  font-size: 1.2em;
}
</style>
