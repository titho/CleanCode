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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
;
exports.UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
exports.UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        try {
            // Generate a salt
            const salt = yield bcrypt_1.default.genSalt(10);
            // Generate a password hash (salt + hash)
            const passwordHash = yield bcrypt_1.default.hash(this.password, salt);
            this.password = passwordHash;
        }
        catch (error) {
            next(error);
        }
    });
});
exports.UserSchema.methods.isValidPassword = function (newPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield bcrypt_1.default.compare(newPassword, this.password);
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
exports.User = mongoose_1.model("users", exports.UserSchema);
