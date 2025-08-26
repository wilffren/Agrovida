import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsFolder = path.join(__dirname, '../docs');
const dataFolder = path.join(__dirname, './server/data');

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