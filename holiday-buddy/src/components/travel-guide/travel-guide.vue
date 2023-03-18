<template>
  <Nav />
  <TravelPlans class="travel-plan-container" :days="days"></TravelPlans>
  <ExportPDF></ExportPDF>
  <!-- <Loader></Loader> -->
</template>

<script>
import TravelPlans from './travel-plan.vue';
import Nav from '@/components/app-header/Nav-header.vue';
import ExportPDF from './exportPdf.vue'

export default {
  components: { TravelPlans, Nav, ExportPDF },
  data() {
    let travelDetailsMetaData = JSON.parse(sessionStorage.getItem('TravelDetailsMetaData'));
    return { days: travelDetailsMetaData };
  }
}
</script>

<style scoped>
.travel-plan-container {
  position: relative;
  margin-top: 4.5rem;
  margin-bottom: 4rem;
}
</style>
