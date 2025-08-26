import cors from "cors";
import express from "express";
import path from "path";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());

// route for csv transformed files
app.get("/csv/:filename", (req, res) => {
    const csvDir = path.join(process.cwd(), "../server/data");
    const filePath = path.join(csvDir, req.params.filename);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send("File no found");
    }
});

app.listen(3000, () => {
    console.log("server running on http://localhost:3001");
});