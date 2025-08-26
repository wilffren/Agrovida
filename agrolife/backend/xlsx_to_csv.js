const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const docsFolder = path.join(__dirname, 'docs');
const dataFolder = path.join(__dirname, 'data');

fs.readdirSync(docsFolder).forEach(file => {
  if (file.endsWith('.xlsx')) {
    const xlsxPath = path.join(docsFolder, file);
    const csvPath = path.join(dataFolder, file.replace('.xlsx', '.csv'));

    const workbook = XLSX.readFile(xlsxPath);
    // convierte la primera hoja a csv
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const csvData = XLSX.utils.sheet_to_csv(worksheet);

    fs.writeFileSync(csvPath, csvData);
    console.log(`Convertido: ${file} -> ${path.basename(csvPath)}`);
  }
});