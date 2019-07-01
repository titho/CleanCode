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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const LocalStrategy = passport_local_1.default.Strategy;
require("dotenv/config");
const user_1 = require("../schemas/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const JWTStrategy = passport_jwt_1.default.Strategy;
const ExtractJWT = passport_jwt_1.default.ExtractJwt;
passport_1.default.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromHeader('authorization'),
    secretOrKey: String(process.env.JWT_SECRET),
}, (payload, done) => __awaiter(this, void 0, void 0, function* () {
    try {
        // Find the user specified in token
        const user = yield user_1.User.findById(payload.sub);
        // If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }
        // Otherwise, return the user
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
})));
passport_1.default.use(new LocalStrategy({}, (username, password, done) => __awaiter(this, void 0, void 0, function* () {
    try {
        // Find the user with username
        const user = yield user_1.User.findOne({ username });
        // If user is not found, handle
        if (!user) {
            return done(null, false);
        }
        //console.log('Finding user was successful');
        // Check if the password is correct
        if (user.password !== undefined) {
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                return done(null, false);
            }
            done(null, user);
        }
    }
    catch (error) {
        done(error, false);
    }
})));
