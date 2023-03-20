<template>
    <div>
      <button @click="downloadPDF" style="color: #eeecec; background: black;">Export as pdf</button>
    </div>
  </template>
  
  <script>
  import html2pdf from 'html2pdf.js';
  import axios from 'axios'
  
  export default {
    name: 'PdfDownloadButton',
    props: {
      htmlContent: {
        type: String
      }
    },
    methods: {
     async downloadPDF() {
        const options = {
          filename: 'travel-plan.pdf',
          image: { type: 'jpeg', quality: 1 },
          html2canvas: { dpi: 192, letterRendering: true },
          jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait' }
        };

        
        const data = sessionStorage.getItem("Messages");
        console.log(data)
        axios.post('https://call-chat-gpt.azurewebsites.net/api/PdfGenerator?code=H3wsbu7iuGmuecZXvOPvY-YrmuV8D4_L6jBHS__m-f09AzFuYBGMvg==',data).then((response) => {
        console.log(response.data)
        sessionStorage.setItem("ExportPdfHtml", response.data);
        html2pdf().set(options).from(response.data).save();
      }).catch(error => {
    console.error(error);
  });
  
      }
    }
  };
  </script>