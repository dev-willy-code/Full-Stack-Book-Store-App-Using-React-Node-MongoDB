const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//se verifica token de admin
router.post("/api/verifyToken", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json(false);

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Usa tu clave secreta para verificar
        res.json(decoded.role === 'admin'); // Responde solo si el rol es 'admin'
    } catch (error) {
        console.log("Token inválido o expirado");
        res.status(401).json(false);
    }
});
