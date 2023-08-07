const exceljs = require('exceljs');

async function exportToExcel(data) {
  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet('Datos');

  worksheet.columns = [
    { header: 'Campo 1', key: 'campo1', width: 15 },
    { header: 'Campo 2', key: 'campo2', width: 15 },
  ];

  data.forEach((row) => {
    worksheet.addRow({ campo1: row.campo1, campo2: row.campo2 });
  });

  const filePath = 'datos.xlsx';
  await workbook.xlsx.writeFile(filePath);
  return filePath;
}

module.exports = { exportToExcel };
