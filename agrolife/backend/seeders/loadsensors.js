import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from "../server/conection_db.js";

export async function loadSensors() {
    const filePath = path.resolve('../server/data/sensors.csv');
    const sensors = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                sensors.push([
                    row.id_sensor,
                    row.id_of_sensor,
                    row.type_sensor,
                    row.estate_sensor
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO sensors (id_sensor, id_of_sensor, type_sensor, estate_sensor) VALUES ?';
                    const [result] = await pool.query(sql, [sensors]);
                    console.log(`✅ inserts ${result.affectedRows} registers on sensors.`);
                    resolve();
                } catch (error) {
                    console.error('❌ Error to insert sensors:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error to read the file CSV of sensors:', err.message);
                reject(err);
            });
    });
}

loadSensors();