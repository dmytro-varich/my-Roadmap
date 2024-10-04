document.getElementById('pdfButton').addEventListener('click', async function() {
    const canvas = await html2canvas(document.getElementById('timeline-section'));
    const imgData = canvas.toDataURL('image/png');

    const { jsPDF } = window.jspdf; 
    const pdf = new jsPDF();

    pdf.addImage(imgData, 'PNG', 10, 10);
    pdf.save('roadmap.pdf');
});