const fs = require('fs');
const PDFDocument = require('pdfkit');

async function exportToPDF(data) {
  const doc = new PDFDocument();
  const filePath = 'datos.pdf';
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);
  doc.fontSize(12).text('Datos exportados a PDF', { align: 'center' });

  data.forEach((row) => {
    doc.fontSize(10).text(`Campo 1: ${row.campo1}, Campo 2: ${row.campo2}`);
  });

  doc.end();
  return filePath;
}

module.exports = { exportToPDF };
