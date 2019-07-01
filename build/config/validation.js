"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../schemas/user");
require("dotenv/config");
exports.signToken = (user) => {
    return jsonwebtoken_1.default.sign({
        iss: 'Blog',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day
    }, String(process.env.JWT_SECRET));
};
function isEmailValid(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
exports.isEmailValid = isEmailValid;
function isPasswordValid(password) {
    const re = /^(?=.*[a-z])(?=.*[0-9])(?=.{6,})/i;
    return re.test(String(password));
}
exports.isPasswordValid = isPasswordValid;
function isUsernameValid(username) {
    const re = /^(?=.{3,30}$)[a-z0-9_.-\s]+$/i;
    return re.test(String(username));
}
exports.isUsernameValid = isUsernameValid;
function isNameValid(name) {
    const re = /^(?=.{3,30}$)[a-z\s]+$/i;
    return re.test(String(name));
}
exports.isNameValid = isNameValid;
function checkUsernameAvailability(username, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundUser = yield user_1.User.findOne({ username });
        if (foundUser) {
            return res.status(400).json({ error: 'Username is already taken' });
        }
    });
}
exports.checkUsernameAvailability = checkUsernameAvailability;
function checkEmailAvailability(email, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundEmail = yield user_1.User.findOne({ email });
        if (foundEmail) {
            return res.status(400).json({ error: 'Email is already taken' });
        }
    });
}
exports.checkEmailAvailability = checkEmailAvailability;
