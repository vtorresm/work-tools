const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.connection');
const excel = require('./excel');
const pdf = require('./pdf');

const app = express();
app.use(bodyParser.json());

app.post('/guardar-datos', async (req, res) => {
  try {
    const { datos } = req.body;
    await db.none('INSERT INTO datos (data, data2) VALUES ($1, $2)', [datos.data, datos.data2]);
    res.status(200).json({ message: 'Datos guardados correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al guardar los datos' });
  }
});

app.get('/exportar-excel', async (req, res) => {
  try {
    const data = await db.any('SELECT * FROM datos');
    const filePath = await excel.exportToExcel(data);
    res.download(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al exportar a Excel' });
  }
});

app.get('/exportar-pdf', async (req, res) => {
  try {
    const data = await db.any('SELECT * FROM datos');
    const filePath = await pdf.exportToPDF(data);
    res.download(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al exportar a PDF' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
