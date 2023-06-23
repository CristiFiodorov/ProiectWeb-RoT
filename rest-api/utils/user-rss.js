
const User = require("../models/user-scheme");
const rss = require('rss');

const recursiveObjectIterator = (data, feed) => {
    if (!data) return;
  
    // If data is an array, iterate over it
    if (Array.isArray(data)) {
      data.forEach((item) => {
        recursiveObjectIterator(item, feed);
      });
    // If data is an object, add it to the feed
    } else if (typeof data === 'object') {
      const { username, score } = data;
  
      feed.item({
        title: username,
        description: `Score: ${score}`,
      });
    }
  };
  

const createRssFeed = async (number) => {
    let users;
    try{
         users = await User.find({ isAdmin: false })
         .sort({score: - 1})
         .limit(number)
         .select('username score');
    } catch (error){
        console.log(error)
    }
    
    let feed = new rss({
      title: 'User Feed',
      description: 'Feed for Users',
    });
  
    recursiveObjectIterator(users, feed);
  
    console.log(feed.xml({ indent: true }));

    return feed.xml({ indent: true });
  };

  
module.exports = {createRssFeed}