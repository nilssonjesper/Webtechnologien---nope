const router = require('express').Router();
const Group = require('../../models/group');
const authMiddleware = require('../../middlewares/authMiddleware');

//Test Route
router.get('/create-test-group', async (req, res) => {
    try {
        const testGroup = new Group({
            name: "Meine Test Gruppe",
            description: "Automatisch erstellt",
            type: true, // Öffentlich
            pwd: null,
            users: [],
            events: []
        });
        const saved = await testGroup.save();
        res.json({ message: "Erfolg!", id: saved._id, name: saved.name });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

//Hier wird Token geprüft, entschlüsselt und in die UserDaten unter req.user gepackt
router.use(authMiddleware);

router.get('/daily-events', async (req, res) => {
    try{
        const{ groupName, userID, date} = req.query;
        
        const result = await Group.findEventsByGroupIDAndDate(groupName, userID, new Date(date));
        res.json(result);
    }
    catch{
        console.log("get daily events failed");
    }
});


router.post('/create', authMiddleware, async (req, res) => {
    try {
        // Jetzt ist req.user durch die Middleware definiert!
        const currentUserId = req.user.userId; 

        const groupData = {
            name: req.body.name,
            description: req.body.description,
            type: req.body.type,
            pwd: req.body.pwd,
            // Hier nutzen wir die ID aus dem Token
            users: [currentUserId], 
            events: []
        };
        console.log("das is currentuserid:", currentUserId);
        // Nutze den userService, um alles in einem Abwasch zu speichern
        req.services.user.createGroup(currentUserId, groupData, (err, group) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(group);
        });
    } catch (error) {
        console.error("Fehler im Backend:", error);
        res.status(500).json({ error: "Interner Serverfehler" });
    }
});

module.exports = router; 
