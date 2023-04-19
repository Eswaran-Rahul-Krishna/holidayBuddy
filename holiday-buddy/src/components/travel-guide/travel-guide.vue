<template>
  <Nav />
  <TravelPlans id="travel-details" class="travel-plan-container" :days="days"></TravelPlans>
  <ExportPDF :htmlContent="pdfData"></ExportPDF>
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

    return { days: travelDetailsMetaData,pdfData:'' };
  },
  mounted(){
    const element =document.getElementById("travel-details");
    const htmlContent = element?.innerHTML;
    const pdfHeader = '<br><div style="display:flex;flex-direction: column;align-items: center; padding-down:20px"><h1 style="color: black;/* top: 10px; *//* position: relative; */"> Holiday Buddy</h1> <br> <br><br><b>  Your trip plan details<b></b></b></div><br> <br>' ;
    this.pdfData = pdfHeader + htmlContent?.toString();
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
