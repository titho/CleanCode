import jwt from 'jsonwebtoken';
import { Router, Request, Response } from 'express';
import { User, IUserModel } from '../schemas/user';
import "dotenv/config"

export let signToken = (user: IUserModel) => {
    return jwt.sign({
        iss: 'Blog',
        sub: user.id,
        iat: new Date().getTime(), //current time
        exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day
    }, String(process.env.JWT_SECRET));
}

export function isEmailValid(email: String): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function isPasswordValid(password: String) {
    const re = /^(?=.*[a-z])(?=.*[0-9])(?=.{6,})/i;
    return re.test(String(password));
}

export function isUsernameValid(username: string) {
    const re = /^(?=.{3,30}$)[a-z0-9_.-\s]+$/i;
    return re.test(String(username));
}

export function isNameValid(name: string) {
    const re = /^(?=.{3,30}$)[a-z\s]+$/i;
    return re.test(String(name));
}

export async function checkUsernameAvailability(username: string, req: Request, res: Response) {
    const foundUser = await User.findOne({ username });
    if (foundUser) {
        return res.status(400).json({ error: 'Username is already taken' });
    }
}

export async function checkEmailAvailability(email: string, req: Request, res: Response) {
        const foundEmail = await User.findOne({ email });
        if (foundEmail) {
            return res.status(400).json({ error: 'Email is already taken' });
        }
}