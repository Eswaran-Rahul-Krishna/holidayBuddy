<template>
    <div>
      <button @click="downloadPDF" style="color: #eeecec; background: black;">Export as pdf</button>
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
    methods: {
     async downloadPDF() {
        const options = {
          filename: 'travel-plan.pdf',
          image: { type: 'jpeg', quality: 1 },
          html2canvas: { dpi: 192, letterRendering: true },
          jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait' }
        };

        const data = sessionStorage.getItem("ExportPdfHtml");
  html2pdf().set(options).from(data).save();
      }
    }
  };
  </script>