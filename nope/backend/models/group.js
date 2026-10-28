const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require("./user");

/*
type: private (0) or public (1) group
pwd: password (in case group is public; otherwise pwd is null)
users: array of all users in the group
*/
const groupSchema = new Schema({
    name: String,
    description: String,
    type: Boolean,
    pwd: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});

/* 
create group method
*/

groupSchema.statics.createGroup = async function (data) {
  const group = new this({
    name: data.name,
    description: data.description,
    type: data.type,
    pwd: data.pwd ?? null,
    users: data.users ?? [],
    events: data.events
  });

  return group.save();
};

/**
 * 
 * @param {id} 
 * @returns the deleted document
 */

groupSchema.statics.deleteGroup = async function (groupId) {
  // Validate group_id
  if (!mongoose.isValidObjectId(groupId)) {
    throw new Error('Invalid group ID');
  }

  // Delete the group
  const result = await this.findByIdAndDelete(groupId);

  if (!result) {
    throw new Error('Group not found');
  }

  return result;
};


/** 
 * find group (id) method
 * finding an exact group by its id
 */
groupSchema.statics.findGroup_id = async function (groupId){
  // validate group_id
  if (!mongoose.isValidObjectId(groupId)) {
    throw new Error('Invalid group ID');
  }
  return this.findById(groupId);
};

// nur die mit status zugesagt

//TO DO: Ändere zu nur den bestätigtem Events
// find function that gives back all events of the group that happen on one day
groupSchema.statics.findEventsByGroupIDAndDate = async function (groupID, userID, date) {
  // find the group
  const group = await this.findById(groupID);
  if (!group) return [];

  // normalize date to "same-day range"
  const start = new Date(date);
  start.setHours(0,0,0,0);

  const end = new Date(date);
  end.setHours(23,59,59,999);

  // query Event model
  const Event = mongoose.model("Event");
  const user = User.findById(userID);
  
  return Event.find({
    group: group._id,
    startDate: { $lte: end },
    endDate: { $gte: start }
  });
};

module.exports = mongoose.model('Group', groupSchema);