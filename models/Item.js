const { mongo } = require("mongoose");

// item model
const mongoose = require(mongoose);
const Schema = mongoose.Schema;

// establish the schema 
const itemSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        category: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        date_added: {
            type: Date,
            default: Date.now


        },
    });

    module.exports = Item = mongoose.model("item", ItemSchema);
