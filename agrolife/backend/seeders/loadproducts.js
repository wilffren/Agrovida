import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from "../server/conection_db.js";

export async function loadProducts() {
    const filePath = path.resolve('server/data/products.csv');
    const products = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                products.push([
                    row.id_product,
                    row.ground_type,
                    row.irrigation_system,
                    row.used_fertilizer,
                    row.id_organic || null
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO products (id_product, ground_type, irrigation_system, used_fertilizer, id_organic) VALUES ?';
                    const [result] = await pool.query(sql, [products]);
                    console.log(`✅ Se insertaron ${result.affectedRows} registros en products.`);
                    resolve();
                } catch (error) {
                    console.error('❌ Error al insertar products:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error al leer el archivo CSV de products:', err.message);
                reject(err);
            });
    });
}

loadProducts();