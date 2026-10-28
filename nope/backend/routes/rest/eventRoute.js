const router = require('express').Router();
const Event = require('../../models/event');
const Group = require('../../models/group');
const authMiddleware = require('../../middlewares/authMiddleware');

//Hier wird Token geprüft, entschlüsselt und in die UserDaten unter req.user gepackt
router.use(authMiddleware);

//only to test backend-frontend-connection
//returns test message
router.get('/group', (req, res) => {
    res.json({ message: 'test' });
});

router.get('/eventduration', async (req, res) =>{
    try{
        const { eventID } = req.query;

        const result = await Event.durationEvent(eventID);
        res.json(result);

    } 
    catch{
        console.log("get eventduration failed");
    }
});

router.post('/addEvent', async (req, res) => {
    try{
        const event = req.body;
        const newEvent = await Event.createEvent(event);
        console.log(newEvent);
        /*console.log("event: ", await Event.findById(newEvent._id));
        const eventsOnJan20 = await Group.findEventsByGroupNameAndDate("Chess Club", "2026-01-20");
        console.log("Events on Jan 20:", eventsOnJan20.map(e => e.name));
        const eventsOnJan19 = await Group.findEventsByGroupNameAndDate("Chess Club", "2026-01-19");
        console.log("Events on Jan 19:", eventsOnJan19.map(e => e.name));
        const eventsOnJan21 = await Group.findEventsByGroupNameAndDate("Chess Club", "2026-01-21");
        console.log("Events on Jan 21:", eventsOnJan21.map(e => e.name));
        */
        return res.status(201).json(newEvent);
    }
    catch{
        console.log("add event failed");

    }
});

router.get('/disconfirmedUsers', async (req, res) => {
    try{
        const {eventID} = req.query;
        const result = await Event.disconfirmedUsers(eventID);
        res.json(result);
    }
    catch{
        console.log("get disconfirmed users failed");
    }
});

router.get('/confirmedUsers', async (req, res) => {
    try{
        const { eventID } = req.query;
        //console.log(eventID)
        const result = await Event.confirmedUsers(eventID);
        console.log( result )
        res.json(result);
    }
    catch{
        console.log("get confirmed users failed");
    }
});

router.get('/unrespondedUsers', async (req, res) => {
    try{
        const { eventID } = req.query;
        const result = await Event.unrespondedUsers(eventID);
        res.json(result);
    }
    catch{
        console.log("get unresponded users failed");
    }
});

router.delete('/deleteEvent/:id', async (req, res) =>{
    try{
        const { id } = req.params;
        const deleted = await Event.deleteEvent(id);
        if(!deleted){
            console.log("event could not be deleted");
        }
        return res.status(200).json(({}));
    }
    catch{
        console.log("eventRoute: delete event failed");
    }
});

router.patch('/confirm', async (req, res) => {
    try{   
        console.log("test1");
        const {userId, eventId} = req.body;
        const result = await Event.confirmEvent(userId, eventId);
        return res.status(200).json({message: "eventRoute: event confirmed"});
    }
    catch{
        console.log("test-1");
        console.log("eventRoute: confirm event failed");
    }
});

router.patch('/disconfirm', async (req, res) => {
    try{
        console.log("test2");
        const {userId, eventId} = req.body;
        const result = await Event.disconfirmEvent(userId, eventId);
        return res.status(200).json({message: "eventRoute: event disconfirmed"});
    }
    catch{
        console.log("test-2");
        console.log("eventRoute: disconfirm event failed");
    }
});

module.exports = router; 