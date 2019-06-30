import { Router } from 'express';
import { signToken } from '../config/validation';
import { isPasswordValid, isUsernameValid } from '../config/validation';
import 'dotenv/config';

const router: Router = Router();

router.post('/', function (req, res) {
    
    if (!isPasswordValid(req.body.password)) {
        return res.status(400).json({ error: 'Invalid password!' });
    }

    if (!isUsernameValid(req.body.username)) {
        return res.status(400).json({ error: 'Invalid username!' });
    }

    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
});

//export login controller
export const LoginController: Router = router;