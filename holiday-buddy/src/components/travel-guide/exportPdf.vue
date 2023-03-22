<template>
    <div style="display: flex;align-content: center;justify-content: center;padding-bottom: 50px;">
      <!-- <button @click="downloadPDF" style="color: #eeecec; background: black;">Export as pdf</button> -->
      <!-- <button class="btn btn-primary bi bi-file-pdf" style="    width: 231px;display: flex; justify-content: center;">Export</button> -->
      <button class="btn btn-primary" @click="downloadPDF" :disabled="isButtonDisabled">
      <i class="fas fa-file-pdf"></i> Export as PDF
    </button>
  </div>
  </template>
  
  <script>
  import html2pdf from 'html2pdf.js';
  
  export default {
    name: 'PdfDownloadButton',
    props: {
      htmlContent: {
        type: String
      }
    },
    data(){
return {
  isButtonDisabled:false
}
    },
    methods: {
     async downloadPDF() {
     // this.isButtonDisabled = true;
        const options = {
          filename: 'travel-plan.pdf',
          image: { type: 'jpeg', quality: 1 },
          html2canvas: { dpi: 192, letterRendering: true },
          jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait' }
        };

        
        //const data = sessionStorage.getItem("Messages");
       
        // axios.post('https://call-chat-gpt.azurewebsites.net/api/PdfGenerator?code=H3wsbu7iuGmuecZXvOPvY-YrmuV8D4_L6jBHS__m-f09AzFuYBGMvg==',data).then((response) => {
        // console.log(response.data)
    //     sessionStorage.setItem("ExportPdfHtml", response.data);
     // html2pdf().set(options).from(response.data).save();
    //     this.isButtonDisabled = false;
    //   }).catch(error => {
    // console.error(error);
    // this.isButtonDisabled = false;
  //});
  // const element =document.getElementById("travel-details");
  //   const htmlContent = element?.innerHTML;
  //   const htmlString = htmlContent?.toString();
  console.log(this.htmlContent)
  html2pdf().set(options).from(this.htmlContent).save();
      }
    }
  };
  </script>