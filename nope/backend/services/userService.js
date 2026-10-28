const User = require("../models/user");
const Group = require("../models/group");

module.exports = function userService(dbURL) {

    // --- Hilfsfunktion für die Eventfunktionen ---
    const updateEventParticipationInternal = async (userId) => {

        // Validierungen
        if (!userId) throw new Error("Invalid user ID");

        const user = await User.findById(userId).populate({
            path: "groups",
            populate: { path: "events" }
        });

        if (!user) throw new Error("User not found");

        // Richtige Funktion
        user.confirmation = [];
        user.disconfirmation = [];

        if (user.groups) {
            for (const group of user.groups) {
                if (group.events) {
                    for (const event of group.events) {
                        
                        // Check Confirmations
                        if (event.confirmation && event.confirmation.some(id => id.equals(user._id))) {
                            user.confirmation.push(event);
                        }
                        
                        // Check Disconfirmations
                        if (event.disconfirmation && event.disconfirmation.some(id => id.equals(user._id))) {
                            user.disconfirmation.push(event);
                        }
                    }
                }
            }
        }
        
        //Änderungen sind nicht permanent (-> für permanent user.save() aufrufen)
        return user;
    };

    return {

        // --- User erstellen ---
        createUser: async (userData, callback) => {
            try {
                const user = new User(userData);
                await user.save();
                callback(null, user);
            } catch (err) {
                callback(err, null);
            }
        },

        // --- User (als JSON) zurückgeben --- mit Beispielaufruf
        getUser: async (userId, callback) => {
            try{
                //1. Suche in DB nach user
                const user = await User.findById(userId).select("-password");
                if(!user){
                    return callback(new Error("Nutzer nicht gefunden"), null);
                }
                //2. Gib user zurück
                callback(null, user);
            }
            catch (err) {
                callback(err, null);
            }
        },

        // --- Profil abrufen (ohne pw) ---
        getProfile: async (userId, callback) => {
            try {
                const user = await User.findById(userId).select("-password"); //pw ausblenden wegen Sicherheit
                if (!user) return callback(new Error("User nicht gefunden!"), null);
                callback(null, user);
            } catch (err) {
                callback(err, null);
            }
        },

        // --- Blockierten Zeitraum hinzufügen ---
        addBlockedPeriod: async (userId, periodData, callback) => {
            try {
                //Update vom Array
                const user = await User.findByIdAndUpdate(
                    userId,
                    {$push: {blockedPeriods: periodData}},
                    {new: true} //gibt aktualisiertes obj zurück
                );
                callback(null, user);
            } catch (err) {
                callback(err, null);
            }
        },

        //TO DO: --- Alle blockierten Zeiträume vom User zurückgeben (an ausgewähltem Tag -> Parameter: Datum) ---

        // --- Holt alle bestätigten Events eines Users ---
        //TO DO: nur die Events von der selectedGroup die ab heute liegen
        getConfirmedEvents: async (userId, callback) => {
            try {
            
                const user = await User.findById(userId);

                //Datum zum Vergleich
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                //selectedGroup laden + Events filtern
                const group = await Group.findById(user.selectedGroup).populate({
                    path: "events",
                    match: { startDate: { $gte: today } }, //Filter: Startdatum >= Heute
                    model: "Event"
                });

                if (!group || !group.events) {
                    return callback(null, []);
                }

                //Nach User filtern (damit es nicht die confirmed events von allen Usern zurückgibt)
                const confirmedEvents = group.events.filter(event => 
                    event.confirmation && event.confirmation.some(id => id.equals(user._id))
                );

                callback(null, confirmedEvents);

            }

            catch (err) {
                callback(err, null);
            }
        },

        // --- Holt alle abgelehnten Events eines Users ---
        //TO DO: nur die Events von der selectedGroup die ab heute liegen
        getDisconfirmedEvents: async (userId, callback) => {
            try {
                const user = await User.findById(userId);

                //Datum zum Vergleich
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                //selectedGroup laden + Events filtern
                const group = await Group.findById(user.selectedGroup).populate({
                    path: "events",
                    match: { startDate: { $gte: today } }, //Filter: Startdatum >= Heute
                    model: "Event"
                });

                if (!group || !group.events) {
                    return callback(null, []);
                }

                //Nach User filtern (damit es nicht die disconfirmed events von allen Usern zurückgibt)
                const disconfirmedEvents = group.events.filter(event => 
                    event.disconfirmation && event.disconfirmation.some(id => id.equals(user._id))
                );

                callback(null, disconfirmedEvents);
            }
            catch (err) {
                callback(err, null);
            }
        },

        // --- Holt Events auf die noch nicht reagiert wurde ---
        //TO DO: nur die Events von der selectedGroup die ab heute liegen
        getUnrespondedEvents: async (userId, callback) => {
            try {

                const user = await User.findById(userId);

                //Datum zum Vergleich
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                //selectedGroup laden + Events filtern
                const group = await Group.findById(user.selectedGroup).populate({
                    path: "events",
                    match: { startDate: { $gte: today } },
                    model: "Event"
                });

                if(!group || !group.events){
                    return callback(null, []);
                }

                //Nach User filtern (damit es nicht die unconfirmed events von allen Usern zurückgibt)
                //gleichzeitig gucken dass wirklich unconfirmed
                const unrespondedEvents = group.events.filter(event => {
                    const isConfirmed = event.confirmation?.some(id => id.equals(user._id));
                    const isDisconfirmed = event.disconfirmation?.some(id => id.equals(user._id));
                    
                    return !isConfirmed && !isDisconfirmed;
                });

                callback(null, unrespondedEvents);

            } catch (err) {
                callback(err, null);
            }
        },

        //Gibt die momentan ausgewählte Gruppe vom User zurück
        getSelectedGroup: async (userId, callback) => {
            try{
                const user = await User.findById(userId).populate("selectedGroup");

                if(!user){
                    return callback(new Error("User nicht gefunden"), null);
                }

                //trifft ein falls noch keine Gruppe selected wurde
                callback(null, user.selectedGroup);

            }
            catch (err) {
                callback(err, null);
            }
        },

        //settet die ausgewählte Gruppe vom User neu
        setSelectedGroup: async (userId, groupId, callback) => {
            try {
                const user = await User.findById(userId);
                if (!user) {
                    return callback(new Error("User nicht gefunden"), null);
                }

                //checkt ob User Mitglied in Gruppe ist
                const isMember = user.groups.some(g => g.toString() === groupId);
                
                if (!isMember) {
                    return callback(new Error("Du bist kein Mitglied dieser Gruppe!"), null);
                }

                //wenn ja: Speichern
                user.selectedGroup = groupId;
                await user.save();

                //wir geben als confirmation die userId zurück
                callback(null, user.selectedGroup);

            }
            catch (err) {
                callback(err, null);
            }
        },

        getAllGroups: async (userID, callback) => {
            try {
                if (!userID) throw new Error("Invalid user ID");
                const user = await User.findById(userID).populate("groups"); 
                callback(null, user.groups);       
            }
            catch (err) {
                callback(err, null);
            }
        },

        addGroup: async (userID, groupID, callback) => {
            try {
                if (!userID) throw new Error("Invalid user ID");
                if (!groupID) throw new Error("Invalid group ID");
                const user = await User.findById(userID);
                //auf G geändert!!
                const group = await Group.findById(groupID);
                await user.groups.push(group._id);
                await user.save();

                group.users.push(user._id);
                await group.save();

                callback(null, user.groups);       
            }
            catch (err) {
                callback(err, null);
            }
        },

        findConfirmedEvents: async (userID, date, callback) => {
            try {
                if (!userID) throw new Error("Invalid user ID");
                const user = await updateEventParticipationInternal(userId);
                callback(null, user.confirmation);
                await user.save();
            }
            catch (err) {
                callback(err, null);
            }
        },
        //Von Anna Lena gemacht
        createGroup: async (userId, groupData, callback) => {
            try {
                const Group = require("../models/group"); 
        
                // 1. Die Gruppe in der DB erstellen
                const groupDataWithUser = {
                    ...groupData,
                    users: [userId]
                };
                const newGroup = await Group.createGroup(groupDataWithUser);
        
                // 2. Den User finden und die neue Gruppe zu seinen Gruppen hinzufügen
                const user = await User.findById(userId);
                if (!user) {
                    return callback(new Error("Nutzer für Gruppenerstellung nicht gefunden"), null);
                }
        
                user.groups.push(newGroup._id);      
                user.selectedGroup = newGroup._id;   
                await user.save();
        
                // 3. Die fertige Gruppe zurückgeben
                callback(null, newGroup);
            } catch (err) {
                callback(err, null);
            }
        }
    };
};