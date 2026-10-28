const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = function authService(dbURL) {
    //-> Mongoose hält interne Verbindung deswegen db-URL vielleicht unnötig

    const PRIVATE_KEY = "WebTech2026";

    return {
        // --- REGISTRIERUNG ---
        register: async (userData, callback) => {
            try {
                //1. Erstelle User-Objekts mit userData = (Name, Email, Passwort)
                const user = new User(userData);

                //2. Speichern userData in der db
                await user.save();

                //3. Generierung eines Tokens damit der user direkt nach Registrierung schon eingeloggt ist
                const token = jwt.sign({ userId: user._id }, PRIVATE_KEY, { expiresIn: '1h' });
                
                const userObj = user.toObject();
                delete userObj.password;

                //Token im Rückgabeobjekt für Login
                callback(null, { user: userObj, token });

            } catch (err) {
                //bei Fehler (z.B. email existiert schon)
                callback(err, null);
            }
        },

        // --- LOGIN ---
        login: async (email, candidatePassword, callback) => {
            try {
                //1. Nutzer mit email in db suchen
                const user = await User.findOne({email});

                if (!user) {
                    return callback(new Error("Nutzer nicht gefunden! Email vielleicht falsch eingegeben?"), null);
                }

                //2. Passwort vergleichen
                //+ (nutzt Hilfsmethode aus user.js)
                const isMatch = await user.comparePassword(candidatePassword);

                if (!isMatch) {
                    return callback(new Error("Falsches Passwort!"), null);
                }

                // 3. Token ausstellen
                // im Token wird die ID des users gespeichert
                const token = jwt.sign({ userId: user._id }, PRIVATE_KEY, { expiresIn: "1h" });

                // 4. User-Objekt (ohne pwd!) gleich zurückgeben
                const userObj = user.toObject();
                delete userObj.password;

                // 5. Jetzt mit Token zurückgeben
                callback(null, { user: userObj, token });

            } catch (err) {
                callback(err, null);
            }
        }

    };
};