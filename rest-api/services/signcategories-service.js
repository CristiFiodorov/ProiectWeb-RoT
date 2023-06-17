const SignCategory = require('../models/signcategory-scheme');
const { Response } = require("../utils/response-class");
const { Status } = require("../utils/status-class");
const {deleteSignsByCategoryId} = require("../services/sign-service");


async function findSignCategories() {
    try{
        const signCategories = await SignCategory.find({},{ __v: 0});

        if(signCategories.length === 0)
            return new Status(404, new Response(false, null, "Sign Categories not found."));

        return new Status(200, new Response(true, signCategories, "Sign Categories successfully retrieved."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function createSignCategory(signCategory) {
    try {
        const newSignCategory = new SignCategory(signCategory);
        const savedSignCategory = await newSignCategory.save();
        return new Status(201, new Response(true, savedSignCategory, "Sign Category successfully created."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function deleteSignCategoryById(signCategoryId) {
    try {
        const deletedSignCategory = await SignCategory.findByIdAndDelete(signCategoryId);
        if(!deletedSignCategory)
            return new Status(404, new Response(false, null, "Sign Category not found."));

        deleteSignsByCategoryId(signCategoryId);

        return new Status(200, new Response(true, deletedSignCategory, "Sign Category successfully deleted."));
    }
    catch (error) {
        console.error(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}

async function updateSignCategoryById(signCategoryId, signCategory) {
    try {
        const updatedSignCategory = await SignCategory.findByIdAndUpdate(signCategoryId, signCategory);
        if(!updatedSignCategory)
            return new Status(404, new Response(false, null, "Sign Category not found."));

        return new Status(200, new Response(true, updatedSignCategory, "Sign Category successfully updated."));
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = {
    findSignCategories, 
    createSignCategory, 
    deleteSignCategoryById, 
    updateSignCategoryById
};