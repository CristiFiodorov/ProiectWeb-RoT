const Sign = require('../models/sign-scheme');
const SignCategory = require('../models/signcategory-scheme');

async function findSignsByCategory(categoryId) {
    const signIndexes = await SignCategory.find({_id: categoryId},{signs: 1});
    const allSigns = await Sign.find();
    const signs = allSigns.filter(sign => signIndexes[0].signs.some(index => index === sign.index));
    return signs;
}

module.exports = {findSignsByCategory};