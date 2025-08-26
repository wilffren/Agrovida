import { Router } from "express";
import { pool } from "../conection_db.js";

const router = Router();

//organics//

// 1. Obtener todos los registros de organics
router.get("/organics", async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM organics`);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Obtener un registro de organics por ID
router.get("/organics/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(
            `SELECT * FROM organics WHERE id_organic = ?`,
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: "Orgánico no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Crear un registro en organics
router.post("/organics", async (req, res) => {
    try {
        const { abbreviation } = req.body;

        if (!abbreviation) {
            return res.status(400).json({ mensaje: "El campo abbreviation es requerido" });
        }

        const [result] = await pool.query(
            `INSERT INTO organics (abbreviation) VALUES (?)`,
            [abbreviation]
        );

        res.status(201).json({ mensaje: "Orgánico creado exitosamente", id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Actualizar un registro en organics
router.put("/organics/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { abbreviation } = req.body;

        const [result] = await pool.query(
            `UPDATE organics SET abbreviation = ? WHERE id_organic = ?`,
            [abbreviation, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Orgánico no encontrado" });
        }

        res.json({ mensaje: "Orgánico actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Eliminar un registro en organics
router.delete("/organics/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            `DELETE FROM organics WHERE id_organic = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Orgánico no encontrado" });
        }

        res.json({ mensaje: "Orgánico eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//products//

// 1. Obtener todos los registros de products
router.get("/products", async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM products`);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Obtener un registro de products por ID
router.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(
            `SELECT * FROM products WHERE id_product = ?`,
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Crear un registro en products
router.post("/products", async (req, res) => {
    try {
        const { ground_type, irrigation_system, used_fertilizer, id_organic } = req.body;

        if (!ground_type || !irrigation_system || !used_fertilizer) {
            return res.status(400).json({ mensaje: "Faltan campos requeridos" });
        }

        const [result] = await pool.query(
            `INSERT INTO products (ground_type, irrigation_system, used_fertilizer, id_organic)
             VALUES (?, ?, ?, ?)`,
            [ground_type, irrigation_system, used_fertilizer, id_organic || null]
        );

        res.status(201).json({ mensaje: "Producto creado exitosamente", id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Actualizar un registro en products
router.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { ground_type, irrigation_system, used_fertilizer, id_organic } = req.body;

        const [result] = await pool.query(
            `UPDATE products SET ground_type = ?, irrigation_system = ?, used_fertilizer = ?, id_organic = ?
             WHERE id_product = ?`,
            [ground_type, irrigation_system, used_fertilizer, id_organic || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.json({ mensaje: "Producto actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Eliminar un registro en products
router.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            `DELETE FROM products WHERE id_product = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.json({ mensaje: "Producto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//crops//

// --- Código para la tabla crops ---

// 1. Obtener todos los registros de crops
router.get("/crops", async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM crops`);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Obtener un registro de crops por ID
router.get("/crops/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(
            `SELECT * FROM crops WHERE id_corp = ?`,
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: "Cultivo no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Crear un registro en crops
router.post("/crops", async (req, res) => {
    try {
        const { variety_corp, type_corp, value, production, date_time } = req.body;

        if (!variety_corp || !type_corp || !value || !production || !date_time) {
            return res.status(400).json({ mensaje: "Faltan campos requeridos" });
        }

        const [result] = await pool.query(
            `INSERT INTO crops (variety_corp, type_corp, value, production, date_time)
             VALUES (?, ?, ?, ?, ?)`,
            [variety_corp, type_corp, value, production, date_time]
        );

        res.status(201).json({ mensaje: "Cultivo creado exitosamente", id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Actualizar un registro en crops
router.put("/crops/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { variety_corp, type_corp, value, production, date_time } = req.body;

        const [result] = await pool.query(
            `UPDATE crops SET variety_corp = ?, type_corp = ?, value = ?, production = ?, date_time = ?
             WHERE id_corp = ?`,
            [variety_corp, type_corp, value, production, date_time, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Cultivo no encontrado" });
        }

        res.json({ mensaje: "Cultivo actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Eliminar un registro en crops
router.delete("/crops/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            `DELETE FROM crops WHERE id_corp = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Cultivo no encontrado" });
        }

        res.json({ mensaje: "Cultivo eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});