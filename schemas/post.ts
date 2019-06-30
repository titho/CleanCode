import { Document, Schema, Model, model, Mongoose } from "mongoose";
import { IPost } from "../interfaces/Ipost";

export interface IPostModel extends IPost, Document {}

export var PostSchema: Schema = new Schema({
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

export const Post: Model<IPostModel> = model<IPostModel>("posts", PostSchema);