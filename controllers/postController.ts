import { Router, Request, Response } from 'express';
import { Post } from '../schemas/post';

const router: Router = Router();

router.get('/:username/posts', (req, res) => {
    const username = req.params.username;
    getUserPosts(username, req, res);
});


router.post('/posts', function (req, res) {
    createPost(req, res);
    return res.json({ message: 'Posted successfully!' });
});

export function createPost(req: Request, res: Response) {
    const newPost = new Post(req.body);
    newPost.save(function (err, data) {
        if (err) throw err;
    });
};

export async function getUserPosts(username: string, req: Request, res: Response) {
    const posts = await Post.find({ associatedUser: username });
    if (posts && posts.length !== 0) {
        res.json(posts);
    } else {
        return res.status(404).json({ error: 'No posts from this username!' });
    }
};

export async function getAllPosts(req: Request, res: Response) {
    const posts = await Post.find();
    if (posts && posts.length !== 0) {
        res.json(posts);
    } else {
        return res.status(404).json({ error: 'There are no posts in the system!' });
    }
};

export const PostController: Router = router;