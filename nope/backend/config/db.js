const mongoose = require("mongoose");
const Group = require("../models/group");
const Event = require("../models/event");


const connectDB = async () => {
  try {
    //versucht Verbindung über Umgebungsvariable oder lokale Standard-DB
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/nope_db");
    
    console.log(`MongoDB verbunden: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Fehler bei MongoDB Verbindung: ${error.message}`);
    process.exit(1);
  }
};

//zum testen mit Datenbank Einträgen
async function test() {

// await Group.deleteMany({ name: "Chess Club" });
// await Event.deleteMany({});
//   const group = await Group.createGroup({
//     name: "Chess Club",
//     description: "A club for chess lovers",
//     type: 0,
//     pwd: null
//   });

//   console.log("Created group:", group._id);

//   // 2. Create two events
//   const event1 = await Event.create({
//     name: "Chess Club Meeting 1",
//     description: "Morning session",
//     group: group._id,
//     startDate: new Date("2026-01-17T10:00:00+01:00"),
//     endDate: new Date("2026-01-17T13:00:00+01:00")
//   });

//   console.log("Created event1:", event1);

//   const event2 = await Event.create({
//     name: "Chess Club Meeting 2",
//     description: "Afternoon session",
//     group: group._id,
//     startDate: new Date("2026-01-19T14:00:00+01:00"),
//     endDate: new Date("2026-01-19T16:00:00+01:00")
//   });

//   console.log("Created event2:", event2);

//   // 3. Test finding the group first
// const foundGroup = await Group.findOne({ name: "Chess Club" });
// console.log("Found group:", foundGroup);

// // 4. Check if events exist in database
// const allEvents = await Event.find({ group: group._id });
// console.log("All events for this group:", allEvents);

  // 3. Test the static function for Jan 17
 /* const eventsOnJan17 = await Group.findEventsByGroupNameAndDate("Chess Club", "2026-01-17");

  console.log("Events on Jan 17:", eventsOnJan17.map(e => e.name));
  // Should log: ["Chess Club Meeting 1"]

  // 4. Test the static function for Jan 18
  const eventsOnJan18 = await Group.findEventsByGroupNameAndDate("Chess Club", "2026-01-18");
  console.log("Events on Jan 18:", eventsOnJan18.map(e => e.name));
  // Should log: ["Chess Club Meeting 2"]

  // 4. Test the static function for Jan 18
  const eventsOnJan20 = await Group.findEventsByGroupNameAndDate("Chess Club", "2026-01-20");
  console.log("Events on Jan 20:", eventsOnJan20.map(e => e.name)); */
        
}

test();


module.exports = connectDB;