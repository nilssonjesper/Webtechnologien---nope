const express = require("express");
const router = express.Router();

//POST /api/auth/register
router.post("/register", (req, res) => {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };

    req.services.auth.register(userData, (err, user) => {
        if (err) {
            //prüft ob email schon existiert -> "duplicate key error"

            console.error("REGISTRIERUNG FEHLER:", err);
            
            if (err.code === 11000) {
                return res.status(409).json({ error: "Die Email ist bereits vergeben" });
            }
            return res.status(500).json({error: err.message});
        }
        res.status(201).json(user);
    });
});

//POST /api/auth/login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    req.services.auth.login(email, password, (err, user) => {
        if (err) {
            return res.status(401).json({ error: "Login fehlgeschlagen" });
        }
        res.json({message: "Login erfolgreich", user: user});
    });
});

module.exports = router;