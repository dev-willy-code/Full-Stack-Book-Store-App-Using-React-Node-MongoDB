const express = require('express');
const User = require('./users.model');
const jwt = require('jsonwebtoken');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY

//revisar si es admin o no : login
// aca no se almacena en localstorage o cookies, sino mas bien se envia una respuesta
router.post("/admin", async (req, res) => {
    const { username, password } = req.body; //post:body
    try {
        const admin = await User.findOne({ username });
        if (!admin) {
            return res.status(404).send({ message: "Admin not found!" });
        }
        if (password !== admin.password) {
            return res.status(401).send({ message: "Invalid Credentils!" });
        }

        const token = jwt.sign({ id: admin._id, username: admin.username, role: admin.role },
            JWT_SECRET,
            { expiresIn: "1h" } //expira en 1 minuto  1 hora es :1h
        )

        return res.status(200).json({
            message: "Authentication succesfully",
            token: token, //esto se usa para AdminLogin.jsx
            user: {
                username: admin.username,
                role: admin.role
            }
        })

    } catch (error) {
        console.error("Failed to login as admin", error)
        res.status(401).send({ message: "Invalid credentials" })
    }
})

module.exports = router;