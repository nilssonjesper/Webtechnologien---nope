const mongoose = require("mongoose");
const Group = require("./models/group");
const Event = require("./models/event");
const UserM = require("./models/user");
//const User = require("./services/userService");
const User = require("./routes/rest/userRoute");


async function test() {
await mongoose.connect("mongodb://127.0.0.1:27017/testdb");
//const userService = userServiceFac("mongodb://127.0.0.1:27017/testdb");

    /* Test for create Group model functions : create, delete, find_id
    // create Group
    const group = await Group.createGroup({
        name: "Chess Club",
        description: "A club for chess lovers",
        type: 0,
        pwd: null
    });

    // Verify it exists in DB
    const fromDb = await Group.findOne({ name: "Chess Club" });

    // testing findGroup_id function
    const fromDb_find_fct = await Group.findGroup_id(group._id);

    if (fromDb) {
        console.log("Group was saved:", fromDb);
        console.log("Group found by fct:", fromDb_find_fct);
    } else {
        console.log("Group not found in DB");
    }

    // testing deleteGroup function
    const delDb = await Group.deleteGroup(group._id);

    console.log(delDb);
    console.log(await Group.findGroup_id(group._id))
    */

    // test for findEventsByNameAndDate

    // 1. Create a group

  //await Group.deleteMany({ name: "Chess Club" });

  // const event1 = await Event.create({
  //   name: "Chess Club Meeting 1",
  //   description: "Morning session",
  //   startDate: new Date("2026-01-17T10:00:00Z"),
  //   endDate: new Date("2026-01-17T12:00:00Z"),
  //   confirmation: [user1._id]
  // });

  // const group = await Group.createGroup({
  //   name: "Chess Club",
  //   description: "A club for chess lovers",
  //   type: 0,
  //   pwd: null,
  //   events: [event1._id]
  // });

  // const user1 = await User.createUser({
  //   name: "Jesper",
  //   email: "jes",
  //   pwd: "1234",
  //   blockedPeriods: { start: new Date(), end: new Date() },
  //   confirmation: [],
  //   disconfirmation: [],
  //   groups: [group._id]
  // });

  // const user2 = await User.createUser({
  //   name: "Lara",
  //   email: "lar",
  //   pwd: "4321",
  //   blockedPeriods: { start: new Date(), end: new Date() },
  //   confirmation: [],
  //   disconfirmation: []
  // });
  // const user3 = await User.createUser({
  //   name: "Jonas",
  //   email: "Jon",
  //   pwd: "11",
  //   blockedPeriods: { start: new Date(), end: new Date() },
  //   confirmation: [],
  //   disconfirmation: []
  // });

  // const group = await Group.createGroup({
  //   name: "Chess Club",
  //   description: "A club for chess lovers",
  //   type: 0,
  //   pwd: null,
  //   users: [user1._id,user2._id,user3._id]
  // });

  // 2. Create two events
  // const event1 = await Event.create({
  //   name: "Chess Club Meeting 1",
  //   description: "Morning session",
  //   group: group._id,
  //   confirmation: [user1._id],
  //   disconfirmation: [user2._id],
  //   startDate: new Date("2026-01-17T10:00:00Z"),
  //   endDate: new Date("2026-01-17T12:00:00Z")


  const ev = await Event.findById('697a569f4a5dd01aa0970a03');
//   console.log(ev);
  const user1 = await UserM.findById('697a55444a5dd01aa0970a00');
//   console.log(user1);
  const user2 = await UserM.findById('697a555d4a5dd01aa0970a01');
//   console.log(user2);
console.log(await User.getDisconfirmedEvents(user2));
console.log(await User.getUnrespondedEvents(user1));

  //console.log("unresponded: ", await User.unrespondedEvents(user1._id));

  // console.log("Created event1:", event1);
  // console.log(event1._id);
  // console.log("duration: ", await Event.durationEvent(event1._id));

  // const event2 = await Event.create({
  //   name: "Chess Club Meeting 2",
  //   description: "Afternoon session",
  //   group: group._id,
  //   startDate: new Date("2026-01-18T14:00:00Z"),
  //   endDate: new Date("2026-01-18T16:00:00Z")
  // });

//   console.log("Created event2:", event2);

//   // 3. Test finding the group first
// const foundGroup = await Group.findOne({ name: "Chess Club" });
// console.log("Found group:", foundGroup);

// // 4. Check if events exist in database
// const allEvents = await Event.find({ group: group._id });
// console.log("All events for this group:", allEvents);

//   // 3. Test the static function for Jan 17
//   const eventsOnJan17 = await Group.findEventsByGroupNameAndDate("Chess Club", "2026-01-17");

//   console.log("Events on Jan 17:", eventsOnJan17.map(e => e.name));
//   // Should log: ["Chess Club Meeting 1"]

//   // 4. Test the static function for Jan 18
//   const eventsOnJan18 = await Group.findEventsByGroupNameAndDate("Chess Club", "2026-01-18");
//   console.log("Events on Jan 18:", eventsOnJan18.map(e => e.name));
//   // Should log: ["Chess Club Meeting 2"]

        
await mongoose.disconnect();
}

test();
