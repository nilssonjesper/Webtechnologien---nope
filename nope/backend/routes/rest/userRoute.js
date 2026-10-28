const router = require('express').Router();

const authMiddleware = require("../../middlewares/authMiddleware");

//Hier wird Token geprüft, entschlüsselt und in die UserDaten unter req.user gepackt
router.use(authMiddleware);

router.get("/currentUser", (req, res) => {

    //wir nehmen die ID aus dem Token
    const currentUserId = req.user.userId;

    //mit dieser ID getUser() aus userService.js aufrufen
    req.services.user.getUser(currentUserId, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        //den User als JSON an das Frontend schicken
        res.json(user);
    });
});

router.get("/findConfirmedEvents", (req, res) => {

    const{ currentUserId, date} = req.query;

    //mit dieser ID getUser() aus userService.js aufrufen
    req.services.user.getUser(currentUserId, date, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        //den User als JSON an das Frontend schicken
        res.json(user);
    });
});

router.get("/allGroups", (req, res) => {

    //wir nehmen die ID aus dem Token
    const currentUserId = req.user.userId;

    //mit dieser ID getUser() aus userService.js aufrufen
    req.services.user.getAllGroups(currentUserId, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        //den User als JSON an das Frontend schicken
        res.json(user);
    });
});

router.get("/selected-group", (req, res) => {

    const userID = req.user.userId;

    req.services.user.getSelectedGroup(userID, (err, group) => {
        if (err) return res.status(500).json({ error: err.message });
        
        //wenn noch keine Gruppe gewählt ist senden wir null (Frontend muss das behandeln!)
        res.json(group);
    });
});

router.put("/selected-group", authMiddleware, (req, res) => {

    //const userID = req.user.userId;
    const groupId = req.body.groupId;
    //user ID über middleware definieren?
    const currentUserId = req.user.userId;
    console.log("current user: ", currentUserId);

    // if (!group._id) {
    //     return res.status(400).json({ error: "Keine GroupID gesendet" });
    // }

    req.services.user.setSelectedGroup(currentUserId, groupId, (err, updatedGroupId) => {
        if (err) {
            return res.status(403).json({ error: err.message });
        }
        res.json({ message: "Gruppe erfolgreich gewechselt!", selectedGroup: updatedGroupId });
    });
});

router.put("/add-group", (req, res) => {

    const userID = req.user.userId;
    const { groupId } = req.body;

    if (!groupId) {
        return res.status(400).json({ error: "Keine GroupID gesendet" });
    }

    req.services.user.addGroup(userID, groupId, (err, updatedGroupId) => {
        if (err) {
            return res.status(403).json({ error: err.message });
        }
        res.json({ message: "Erfolgreich Gruppe beigetreten" });
    });
});

router.get("/confirmedEvents", (req, res) => {
    const userID = req.user.userId; 

    req.services.user.getConfirmedEvents(userID, (err, events) => {
        if(err) return res.status(500).json({error: err.message});
        res.json(events);
    });
});

router.get("/disconfirmedEvents", (req, res) => {
    const userID = req.user.userId;
    req.services.user.getDisconfirmedEvents(userID, (err, events) => {
        if(err) return res.status(500).json({error: err.message});
        res.json(events);
    });
});

router.get("/unrespondedEvents", (req, res) => {
    const userID = req.user.userId;
    req.services.user.getUnrespondedEvents(userID, (err, events) => {
        if(err) return res.status(500).json({error: err.message});
        res.json(events);
    });
});

module.exports = router;