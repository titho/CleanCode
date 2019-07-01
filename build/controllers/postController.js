"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_1 = require("../schemas/post");
const router = express_1.Router();
router.get('/:username/posts', (req, res) => {
    const username = req.params.username;
    getUserPosts(username, req, res);
});
router.post('/posts', function (req, res) {
    createPost(req, res);
    return res.json({ message: 'Posted successfully!' });
});
function createPost(req, res) {
    const newPost = new post_1.Post(req.body);
    newPost.save(function (err, data) {
        if (err)
            throw err;
    });
}
exports.createPost = createPost;
;
function getUserPosts(username, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const posts = yield post_1.Post.find({ associatedUser: username });
        if (posts && posts.length !== 0) {
            res.json(posts);
        }
        else {
            return res.status(404).json({ error: 'No posts from this username!' });
        }
    });
}
exports.getUserPosts = getUserPosts;
;
function getAllPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const posts = yield post_1.Post.find();
        if (posts && posts.length !== 0) {
            res.json(posts);
        }
        else {
            return res.status(404).json({ error: 'There are no posts in the system!' });
        }
    });
}
exports.getAllPosts = getAllPosts;
;
exports.PostController = router;
