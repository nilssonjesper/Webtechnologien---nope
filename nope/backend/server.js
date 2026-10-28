const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require("./config/db");
require('dotenv').config();

const serviceFactory = require("./services/index");
const serviceMiddleware = require("./middlewares/serviceMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Erlaubt dem Angular-Frontend den Zugriff
app.use(express.json()); // Ermöglicht das Lesen von JSON-Daten im Body

// MongoDB Verbindung 
connectDB();

// Services initialisieren
const services = serviceFactory(); //-> Datenbank-URL wird hier übergeben falls nötig

// Middleware aktivieren
app.use(serviceMiddleware(services));

// Test-Route
app.get('/', (req, res) => {
  res.send('Der "nope." Server läuft!');
});

// Hier werden später die Routen eurer Teammitglieder importiert
// Beispiel: app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/group', require('./routes/rest/groupRoute'));
app.use('/api/event', require('./routes/rest/eventRoute'));
app.use('/api/user', require('./routes/rest/userRoute'));
app.use('/api/auth', require('./routes/rest/authRoute'));

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});