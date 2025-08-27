import { Router } from "express";
import { pool } from "../conection_db.js";

const router = Router();

//organics//

// 1. Get all organic records
router.get("/organics", async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM organics`);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Get a record of organics by ID
router.get("/organics/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(
            `SELECT * FROM organics WHERE id_organic = ?`,
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: "Orgánic not found" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Create a record in organics
router.post("/organics", async (req, res) => {
    try {
        const { abbreviation } = req.body;

        if (!abbreviation) {
            return res.status(400).json({ mensaje: "the field abbreviation is required" });
        }

        const [result] = await pool.query(
            `INSERT INTO organics (abbreviation) VALUES (?)`,
            [abbreviation]
        );

        res.status(201).json({ mensaje: "Organic successfully created", id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Update a record in organics
router.put("/organics/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { abbreviation } = req.body;

        const [result] = await pool.query(
            `UPDATE organics SET abbreviation = ? WHERE id_organic = ?`,
            [abbreviation, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Organic not found" });
        }

        res.json({ mensaje: "Organic successfully updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Deleting a record in organics
router.delete("/organics/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            `DELETE FROM organics WHERE id_organic = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Organic not found" });
        }

        res.json({ mensaje: "Organic successfully removed" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//products//

// 1. Get all product records
router.get("/products", async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM products`);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Get a product record by ID
router.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(
            `SELECT * FROM products WHERE id_product = ?`,
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: "Product not found" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Create a record in products
router.post("/products", async (req, res) => {
    try {
        const { ground_type, irrigation_system, used_fertilizer, id_organic } = req.body;

        if (!ground_type || !irrigation_system || !used_fertilizer) {
            return res.status(400).json({ mensaje: "Required fields are missing" });
        }

        const [result] = await pool.query(
            `INSERT INTO products (ground_type, irrigation_system, used_fertilizer, id_organic)
             VALUES (?, ?, ?, ?)`,
            [ground_type, irrigation_system, used_fertilizer, id_organic || null]
        );

        res.status(201).json({ mensaje: "Successfully created product", id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Update a record in products
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
            return res.status(404).json({ mensaje: "Product not found" });
        }

        res.json({ mensaje: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Delete a record in products
router.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            `DELETE FROM products WHERE id_product = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Product not found" });
        }

        res.json({ mensaje: "Product successfully removed" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//crops//


// 1. Get all crop records
router.get("/crops", async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM crops`);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Get a crop record by ID
router.get("/crops/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(
            `SELECT * FROM crops WHERE id_corp = ?`,
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: "Crop not found" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Create a record in crops
router.post("/crops", async (req, res) => {
    try {
        const { variety_corp, type_corp, value, production, date_time } = req.body;

        if (!variety_corp || !type_corp || !value || !production || !date_time) {
            return res.status(400).json({ mensaje: "Required fields are missing" });
        }

        const [result] = await pool.query(
            `INSERT INTO crops (variety_corp, type_corp, value, production, date_time)
             VALUES (?, ?, ?, ?, ?)`,
            [variety_corp, type_corp, value, production, date_time]
        );

        res.status(201).json({ mensaje: "Crop successfully created", id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Update a record in crops
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
            return res.status(404).json({ mensaje: "Crop not found" });
        }

        res.json({ mensaje: "Crop successfully updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Deleting a record in Crops
router.delete("/crops/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            `DELETE FROM crops WHERE id_corp = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Crop not found" });
        }

        res.json({ mensaje: "Crop successfully removed" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//sensors//


// 1. Get all sensor logs
router.get("/sensors", async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM sensors`);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Get a sensor log by ID
router.get("/sensors/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(
            `SELECT * FROM sensors WHERE id_sensor = ?`,
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: "Sensor not found" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Create a record in sensors
router.post("/sensors", async (req, res) => {
    try {
        const { id_of_sensor, type_sensor, estate_sensor } = req.body;

        if (!id_of_sensor || !type_sensor || !estate_sensor) {
            return res.status(400).json({ mensaje: "Required fields are missing" });
        }

        const [result] = await pool.query(
            `INSERT INTO sensors (id_of_sensor, type_sensor, estate_sensor)
             VALUES (?, ?, ?)`,
            [id_of_sensor, type_sensor, estate_sensor]
        );

        res.status(201).json({ mensaje: "Sensor created successfully", id: result.insertId });
    } catch (error) {
        // Error por id_of_sensor duplicado
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ mensaje: "The id_of_sensor already exists" });
        }
        res.status(500).json({ error: error.message });
    }
});

// 4. Update a record in sensors
router.put("/sensors/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { id_of_sensor, type_sensor, estate_sensor } = req.body;

        const [result] = await pool.query(
            `UPDATE sensors SET id_of_sensor = ?, type_sensor = ?, estate_sensor = ?
             WHERE id_sensor = ?`,
            [id_of_sensor, type_sensor, estate_sensor, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Sensor not found" });
        }

        res.json({ mensaje: "Sensor updated successfully" });
    } catch (error) {
        // Error por id_of_sensor duplicado
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ mensaje: "The id_of_sensor already exists" });
        }
        res.status(500).json({ error: error.message });
    }
});

// 5. Deleting a record in sensors
router.delete("/sensors/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            `DELETE FROM sensors WHERE id_sensor = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Sensor not found" });
        }

        res.json({ mensaje: "Sensor successfully removed" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//technicians//

// 1. Get all technician records
router.get("/technicians", async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM technicians`);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Get a record of technicians by ID
router.get("/technicians/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(
            `SELECT * FROM technicians WHERE id_technician = ?`,
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: "Technician not found" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Create a record in technicians
router.post("/technicians", async (req, res) => {
    try {
        const { technician, date_maintenance, id_sensor } = req.body;

        if (!technician || !date_maintenance) {
            return res.status(400).json({ mensaje: "Required fields are missing" });
        }

        const [result] = await pool.query(
            `INSERT INTO technicians (technician, date_maintenance, id_sensor)
             VALUES (?, ?, ?)`,
            [technician, date_maintenance, id_sensor || null]
        );

        res.status(201).json({ mensaje: "Technician created successfully", id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Update a record in technicians
router.put("/technicians/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { technician, date_maintenance, id_sensor } = req.body;

        const [result] = await pool.query(
            `UPDATE technicians SET technician = ?, date_maintenance = ?, id_sensor = ?
             WHERE id_technician = ?`,
            [technician, date_maintenance, id_sensor || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Technician not found" });
        }

        res.json({ mensaje: "Technician successfully updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Delete a record in technicians
router.delete("/technicians/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            `DELETE FROM technicians WHERE id_technician = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Technician not found" });
        }

        res.json({ mensaje: "Technician successfully eliminated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//farms//


// 1. Get all farm records
router.get("/farms", async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM farms`);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Get a farm record by ID
router.get("/farms/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(
            `SELECT * FROM farms WHERE id_farm = ?`,
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: "Property not found" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Create a record in farms
router.post("/farms", async (req, res) => {
    try {
        const { name_farm, region, id_corp, id_sensor, id_product } = req.body;

        if (!name_farm || !region) {
            return res.status(400).json({ mensaje: "Required fields are missing" });
        }

        const [result] = await pool.query(
            `INSERT INTO farms (name_farm, region, id_corp, id_sensor, id_product)
             VALUES (?, ?, ?, ?, ?)`,
            [name_farm, region, id_corp || null, id_sensor || null, id_product || null]
        );

        res.status(201).json({ mensaje: "Successfully created farm", id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Update a record in farms
router.put("/farms/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name_farm, region, id_corp, id_sensor, id_product } = req.body;

        const [result] = await pool.query(
            `UPDATE farms SET name_farm = ?, region = ?, id_corp = ?, id_sensor = ?, id_product = ?
             WHERE id_farm = ?`,
            [name_farm, region, id_corp || null, id_sensor || null, id_product || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Property not found" });
        }

        res.json({ mensaje: "Farm successfully updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Deleting a record in farms
router.delete("/farms/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            `DELETE FROM farms WHERE id_farm = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Property not found" });
        }

        res.json({ mensaje: "Farm successfully deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;