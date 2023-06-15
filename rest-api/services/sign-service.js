const Sign = require('../models/sign-scheme');
const SignCategory = require('../models/signcategory-scheme');

async function findSignsByCategory(categoryId) {
    const signs = await Sign.find({parentId: categoryId});
    return signs;
}

async function findSignById(signId) {
    const sign = await Sign.find({_id: signId});
    return sign[0];
}

async function findNextSignsByCategory(signId, categoryId) {
    const signs = await Sign.find({parentId: categoryId});
    const currentSignIndex = signs.findIndex(sign => sign._id.toString() === signId);

    if (currentSignIndex === signs.length - 1) 
        return signs[0]
    if (currentSignIndex === -1)
        return signs[signs.length - 1]

    const nextSign = signs[currentSignIndex + 1];

    return nextSign;
}


async function findPrevSignsByCategory(signId, categoryId) {
    const signs = await Sign.find({parentId: categoryId});
    const currentSignIndex = signs.findIndex(sign => sign._id.toString() === signId);

    if (currentSignIndex === signs.length - 1) 
        return signs[0]
    if (currentSignIndex === -1)
        return signs[signs.length - 1]

    const nextSign = signs[currentSignIndex - 1];

    return nextSign;
}

module.exports = {findSignsByCategory, findSignById, findNextSignsByCategory, findPrevSignsByCategory};