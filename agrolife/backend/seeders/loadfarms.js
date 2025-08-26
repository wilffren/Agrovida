import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from "../server/conection_db.js";

export async function loadFarms() {
    const filePath = path.resolve('server/data/farms.csv');
    const farms = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                farms.push([
                    row.id_farm,
                    row.name_farm,
                    row.region,
                    row.id_corp || null,
                    row.id_sensor || null,
                    row.id_product || null
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO farms (id_farm, name_farm, region, id_corp, id_sensor, id_product) VALUES ?';
                    const [result] = await pool.query(sql, [farms]);
                    console.log(`✅ Se insertaron ${result.affectedRows} registros en farms.`);
                    resolve();
                } catch (error) {
                    console.error('❌ Error al insertar farms:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error al leer el archivo CSV de farms:', err.message);
                reject(err);
            });
    });
}

loadFarms();