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
const validation_1 = require("../config/validation");
const user_1 = require("../schemas/user");
const validation_2 = require("../config/validation");
require("dotenv/config");
const router = express_1.Router();
router.post('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, username, email, password } = req.body;
        // Check if email and password are valid with regex
        if (!validation_1.isEmailValid(email)) {
            return res.status(400).json({ error: 'Invalid email!' });
        }
        if (!validation_1.isPasswordValid(password)) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long and it must contain at least 1 number!' });
        }
        if (!validation_1.isUsernameValid(username)) {
            return res.status(400).json({ error: 'Invalid username!' });
        }
        if (!validation_1.isNameValid(name)) {
            return res.status(400).json({ error: 'Invalid name format!' });
        }
        yield validation_1.checkUsernameAvailability(username, req, res);
        yield validation_1.checkEmailAvailability(email, req, res);
        // Create a new user
        const newUser = new user_1.User({ name, username, email, password });
        yield newUser.save(function (err, data) {
            if (err)
                throw err;
        });
        // Return token of user
        const token = validation_2.signToken(req.body.username);
        res.status(200).json({ token: token });
    });
});
exports.RegisterController = router;
