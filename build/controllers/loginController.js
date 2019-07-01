"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = require("../config/validation");
const validation_2 = require("../config/validation");
require("dotenv/config");
const router = express_1.Router();
router.post('/', function (req, res) {
    if (!validation_2.isPasswordValid(req.body.password)) {
        return res.status(400).json({ error: 'Invalid password!' });
    }
    if (!validation_2.isUsernameValid(req.body.username)) {
        return res.status(400).json({ error: 'Invalid username!' });
    }
    // Generate token
    const token = validation_1.signToken(req.user);
    res.status(200).json({ token });
});
//export login controller
exports.LoginController = router;
