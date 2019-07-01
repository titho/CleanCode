"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    associatedUser: {
        type: String,
    },
});
exports.Post = mongoose_1.model("posts", exports.PostSchema);
