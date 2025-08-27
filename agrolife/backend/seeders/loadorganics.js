import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from "../server/conection_db.js";

export async function loadOrganics() {
    const filePath = path.resolve('../server/data/organics.csv');
    const organics = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                organics.push([
                    row.id_organic,
                    row.abbreviation.trim()
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO organics (id_organic, abbreviation) VALUES ?';
                    const [result] = await pool.query(sql, [organics]);
                    console.log(`✅ inserts ${result.affectedRows} registers on organics.`);
                    resolve();
                } catch (error) {
                    console.error('❌ Error to insert organics:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error to read the file  CSV of organics:', err.message);
                reject(err);
            });
    });
}

loadOrganics();