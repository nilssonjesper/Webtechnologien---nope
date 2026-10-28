const jwt = require("jsonwebtoken");

const PRIVATE_KEY = "WebTech2026";

module.exports = (req, res, next) => {

    //Lese Auth-Header aus
    const authHeader = req.headers.authorization;

    //Gib Fehler wenn kein Auth-Header da ist
    if(!authHeader){
        return res.status(401).json({ error: "Zugriff verweigert: Kein Token vorhanden"});
    }

    //extrahiere Token aus Auth-Header
    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({error: "Zugriff verweigert: Format von Token ungültig"});
    }

    try{

        //Prüfe Token
        const decodedToken = jwt.verify(token, PRIVATE_KEY);

        //Daten aus Token an Request Obj hängen
        req.user = decodedToken;

        //Befehl sagt dass man weiter zur nächsten Route gehen kann
        next();
    }
    catch(err) {
        //Falls Token manipuliert oder abgelaufen
        return res.status(401).json({error: "Zugriff verweigert: Token ist manipuliert oder abgelaufen"});
    }

}