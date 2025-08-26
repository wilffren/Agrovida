import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from "../server/conection_db.js";

export async function loadTechnicians() {
    const filePath = path.resolve('../server/data/technicians.csv');
    const technicians = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                technicians.push([
                    row.id_technician,
                    row.technician,
                    row.date_maintenance,
                    row.id_sensor || null
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO technicians (id_technician, technician, date_maintenance, id_sensor) VALUES ?';
                    const [result] = await pool.query(sql, [technicians]);
                    console.log(`✅ inserts ${result.affectedRows} registers on technicians.`);
                    resolve();
                } catch (error) {
                    console.error('❌ Error to insert technicians:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error to read the file CSV of technicians:', err.message);
                reject(err);
            });
    });
}

loadTechnicians();