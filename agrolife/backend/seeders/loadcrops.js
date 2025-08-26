import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from "../server/conection_db.js";

export async function loadCrops() {
    const filePath = path.resolve('server/data/crops.csv');
    const crops = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                crops.push([
                    row.id_corp,
                    row.variety_corp,
                    row.type_corp,
                    row.value,
                    row.production,
                    row.date_time
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO crops (id_corp, variety_corp, type_corp, value, production, date_time) VALUES ?';
                    const [result] = await pool.query(sql, [crops]);
                    console.log(`✅ Se insertaron ${result.affectedRows} registros en crops.`);
                    resolve();
                } catch (error) {
                    console.error('❌ Error al insertar crops:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error al leer el archivo CSV de crops:', err.message);
                reject(err);
            });
    });
}

loadCrops();