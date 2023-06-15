const SignCategory = require('../models/signcategory-scheme');


async function findSignCategories() {
    const signCategories = await SignCategory.find({},{ __v: 0});
    return signCategories;
}

module.exports = {findSignCategories};