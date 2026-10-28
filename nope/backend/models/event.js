const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require("./user");
const Group = require("./group");

/*
type: private (0) or public (1) group
pwd: password (in case group is public; otherwise pwd is null)
group: group in which event is posted/to which event belongs
confirmation: array of user, who have confirmed
disconfirmation: array of user, who have disconfirmed

*/
const eventSchema = new Schema({
    name: String,
    description: String,
    group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
    confirmation: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    disconfirmation: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    startDate: Date,
    endDate: Date
});

/* 
create event method
*/

eventSchema.statics.createEvent = async function (data) {

  const event = new this({
    name: data.name,
    description: data.description,
    group: data.group,
    confirmation: data.confirmation,
    disconfirmation: data.disconfirmation,
    startDate: data.startDate,
    endDate: data.endDate
  });

  const groupTemp = await Group.findById(event.group._id);
  groupTemp.events.push(event);
  groupTemp.save();
  //console.log("event.js:" + event)
  return event.save(); // stores it in MongoDB
};

/**
 * 
 * @param {id} 
 * @returns the deleted document
 */

eventSchema.statics.deleteEvent = async function (eventId) {
  // Validate event_id
  if (!mongoose.isValidObjectId(eventId)) {
    throw new Error('Invalid event ID');
  }

  // Delete the event
  const result = await this.findByIdAndDelete(eventId);

  if (!result) {
    throw new Error('Event not found');
  }

  return result;
};

/** 
 * find group (id) method
 * finding an exact group by its id
 */
eventSchema.statics.findEvent_id = async function (eventId){
    // validate event_id
    if (!mongoose.isValidObjectId(eventId)) {
        throw new Error('Invalid event ID');
    }
    return this.findById(eventId);
}

/*getDuration : endDate-startDate
input: id of event
output: integer 
*/
eventSchema.statics.durationEvent = async function (eventId){
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    throw new Error("Invalid event ID");
  }
  const event = await this.findEvent_id(eventId);

  if (!event) {
    throw new Error("Event not found");
  }
  return Math.floor((event.endDate - event.startDate)/1000/60);
}

/*confirmedUsers --> to get the users that confirmed their presence for an event
input: id of event
output: array of the users who have confirmed
*/
eventSchema.statics.confirmedUsers = async function (eventId){
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    throw new Error("Invalid event ID");
  }
  const event = await this.findById(eventId).populate({
    path: "group",
    populate: { path: "users" }
  });
  if (!event) {
    throw new Error("Event not found");
  }
  const usersInGroup = event.group?.users || [];
  //return usersInGroup;
  return usersInGroup.filter(u => event.confirmation.some(r => r._id.equals(u._id)));
}

/*disconfirmedUsers --> to get the users that disconfirmed their presence for an event
input: id of event
output: array of the users who have disconfirmed
*/
eventSchema.statics.disconfirmedUsers = async function (eventId){
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    throw new Error("Invalid event ID");
  }
  const event = await this.findById(eventId).populate({
    path: "group",
    populate: { path: "users" }
  });  
  if (!event) {
    throw new Error("Event not found");
  }
  const usersInGroup = event.group?.users || [];
  //return usersInGroup;
  return usersInGroup.filter(u => event.disconfirmation.some(r => r._id.equals(u._id)));
}

/*unrespondedUsers --> to get the users that have not yet responded/reacted to an event
input: id of event
output: array of the users who have not responded to an event
*/
eventSchema.statics.unrespondedUsers = async function (eventId){
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    throw new Error("Invalid event ID");
  }
  const event = await this.findById(eventId).populate({
    path: "group",
    populate: { path: "users" }
  });
  if (!event) {
    throw new Error("Event not found");
  }

  const responded = (event.confirmation || []).concat(event.disconfirmation || []);
  const usersInGroup = event.group?.users || [];

  // Return users in the group who have not responded
  // u: unresponded; r: responded
  return usersInGroup.filter(u => !responded.some(r => r._id.equals(u._id)));

} 

/**
 * function for a user to confirm an event
 * takes userID 
 * returns bool
 */
eventSchema.statics.confirmEvent = async function(userID, eventID){
  // find user
  user = await User.findById(userID);
  // find event
  ev = await this.findById(eventID);

  console.log("user: ", user)
  console.log("event: ", ev)
  // set confirmation in event
  ev.confirmation.push(user._id);
  ev.save();
  console.log("conf: ", ev);
  //console.log("conf: ",ev.confirmation);
  return true;
}

eventSchema.statics.disconfirmEvent = async function(userID, eventID){
  // find user
  user = await User.findById(userID);
  // find event
  ev = await this.findById(eventID);

  // set confirmation in event
  ev.disconfirmation.push(user._id);
  ev.save();

  return true;
}
module.exports = mongoose.models.Event || mongoose.model('Event', eventSchema);