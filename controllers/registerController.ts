import { Router, Request, Response } from 'express';
import { isEmailValid, isPasswordValid, isUsernameValid, isNameValid, checkEmailAvailability, checkUsernameAvailability } from '../config/validation';
import { User } from '../schemas/user';
import { signToken } from '../config/validation';
import "dotenv/config";

const router: Router = Router();

router.post('/', async function (req: Request, res: Response) {
    const { name, username, email, password } = req.body;

    // Check if email and password are valid with regex
    if (!isEmailValid(email)) {
        return res.status(400).json({ error: 'Invalid email!' });
    }

    if (!isPasswordValid(password)) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long and it must contain at least 1 number!' });
    }

    if (!isUsernameValid(username)) {
        return res.status(400).json({ error: 'Invalid username!' });
    }

    if (!isNameValid(name)) {
        return res.status(400).json({ error: 'Invalid name format!' });
    }

    await checkUsernameAvailability(username, req, res);
    await checkEmailAvailability(email, req, res);


    // Create a new user
    const newUser = new User({ name, username, email, password });
    await newUser.save(function (err, data) {
        if (err) throw err;
    });

    // Return token of user
    const token = signToken(req.user);
    res.status(200).json({ token: token });
});

export const RegisterController: Router = router;