<template>
  <TravelPlans class="travel-plan-container" :days="days"></TravelPlans>
</template>

<script>
import TravelPlans from './travel-plan.vue'

export default {
  components: { TravelPlans },
  data() {
    return {
      days: [
        [],
        [
          { time: '8:00 AM', details: 'Breakfast at hotel' },
          { time: '10:00 AM', details: 'Visit to Museum A' },
          { time: '1:00 PM', details: 'Lunch at Restaurant B' },
          { time: '3:00 PM', details: 'Sightseeing at Landmark C' },
          { time: '6:00 PM', details: 'Dinner at Restaurant D' }
        ],
        [
          { time: '9:00 AM', details: 'Visit to Landmark E' },
          { time: '12:00 PM', details: 'Lunch at Restaurant F' },
          { time: '2:00 PM', details: 'Shopping at Mall G' },
          { time: '5:00 PM', details: 'Visit to Park H' },
          { time: '7:00 PM', details: 'Dinner at Restaurant I' }
        ],
        [
          { time: '10:00 AM', details: 'Visit to Landmark J' },
          { time: '1:00 PM', details: 'Lunch at Restaurant K' },
          { time: '3:00 PM', details: 'Visit to Museum L' },
          { time: '6:00 PM', details: 'Dinner at Restaurant M' }
        ],
        [
          { time: '8:00 AM', details: 'Breakfast at hotel' },
          { time: '10:00 AM', details: 'Visit to Park N' },
          { time: '1:00 PM', details: 'Lunch at Restaurant O' },
          { time: '3:00 PM', details: 'Sightseeing at Landmark P' },
          { time: '6:00 PM', details: 'Dinner at Restaurant Q' }
        ]
      ]
    }
  }
}
</script>

<style scoped>
.travel-plan-container {
  position: relative;
  z-index: 200;
  top: 90px;
}
</style>
