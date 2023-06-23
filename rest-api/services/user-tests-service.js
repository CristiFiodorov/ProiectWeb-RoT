const { Response } = require("../utils/response-class");
const { Status } = require("../utils/status-class");
const { mongo } = require("mongoose");
const User = require("../models/user-scheme");


const _getUserTestScores = async (userId) => {
  try {
    console.log(userId);
    const user = await User.findOne({_id: `${userId}`} );
    console.log(user);
    if(user == null){
      return null;
    }
    return user.tests;
} catch (error) {
    console.error(error);
    throw new Error();
}
  
}
const getUserTestScores = async (req) => {
  try {
    console.log(req.user);
    if(req?.user == null) { return new Status(404, new Response(false, null, "User was not found or invalid request.")); }
    
    const userId = req.user.id;
    const user = await _getUserTestScores(userId);
    if (user == null) { return new Status(404, new Response(false, null, "User was not found or invalid request.")); }
    return new Status(200, new Response(true, user, "Score successfully updated."));
} catch (error) {
    console.log(error);
    return new Status(500, new Response(false, null, "There was an internal error."));
}
}
module.exports = { getUserTestScores };