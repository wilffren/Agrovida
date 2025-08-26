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
                const tech = row["technician"] || row["technician "];
                if (tech && tech.trim() !== "") {
                    technicians.push([
                        tech.trim(),
                        row.date_maintenance
                    ]);
                }
            })
            .on('end', async () => {
                try {
                    if (technicians.length === 0) {
                        console.log("⚠️ There is no valid data to insert into technicians.");
                        resolve();
                        return;
                    }
                    const sql = 'INSERT INTO technicians (technician, date_maintenance) VALUES ?';
                    const [result] = await pool.query(sql, [technicians]);
                    console.log(`✅ inserts ${result.affectedRows} registros en technicians.`);
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