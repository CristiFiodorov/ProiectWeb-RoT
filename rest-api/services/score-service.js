const { Response } = require("../utils/response-class");
const { Status } = require("../utils/status-class");
const User = require("../models/user-scheme");
const { getBodyFromRequest } = require("../utils/request-utils");

const _addScore = async (req, userId) => {
    try {
        const body = JSON.parse(await getBodyFromRequest(req));
        let scoreToAdd = 0;
        if (!body.hasOwnProperty('score')) {
            return null;
        }
        scoreToAdd = Number(body['score']);
        console.log(scoreToAdd);
        const user = await User.findOne({ _id: `${userId}` });
        if (user == null) {
            return null;
        }
        console.log(user.score);
        if(user.score == undefined){
            user.score = 0;
        }
        const score = (scoreToAdd) + user.score;
        user.score = score;
        await User.updateOne({ _id: `${userId}` }, { $set: { score: score } })
        return user;
    } catch (error) {
        console.error(error);
        throw new Error();
    }
}

const addScore = async (req) => {
    try {
        if(req?.user == null) { return new Status(404, new Response(false, null, "User was not found or invalid request.")); }
        
        const userId = req.user.id;
        const user = await _addScore(req, userId);
        if (user == null) { return new Status(404, new Response(false, null, "User was not found or invalid request.")); }
        return new Status(200, new Response(true, user, "Score successfully updated."));
    } catch (error) {
        console.log(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

module.exports = { addScore };