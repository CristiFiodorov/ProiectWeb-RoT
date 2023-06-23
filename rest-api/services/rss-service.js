const { Response } = require("../utils/response-class");
const { Status } = require("../utils/status-class");
const { createRssFeed } = require("../utils/user-rss");

const getRss = async(number) => {
    try{
        const response = await createRssFeed(number);
        console.log(typeof response)
        return new Status(200, new Response(true, response, "Score successfully updated."));
    } catch(error) {
        console.log(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}
module.exports = {getRss}