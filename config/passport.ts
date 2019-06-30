import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT, { VerifiedCallback } from 'passport-jwt';
const LocalStrategy = passportLocal.Strategy;
import { isUsernameValid, isPasswordValid } from '../config/validation'
import "dotenv/config"
import { User } from '../schemas/user';
import bcrypt from 'bcrypt';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromHeader('authorization'),
    secretOrKey: String(process.env.JWT_SECRET),
}, async (payload, done) => {
    try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }
        // Otherwise, return the user
        done(null, user);

    } catch (error) {
        done(error, false);
    }
}));

passport.use(new LocalStrategy({

}, async (username: string, password: string, done: VerifiedCallback) => {
    try {

        // Find the user with username
        const user = await User.findOne({ username });

        // If user is not found, handle
        if (!user) {
            return done(null, false);
        }

        //console.log('Finding user was successful');

        // Check if the password is correct
        if (user.password !== undefined) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false);
            }
            done(null, user);
        }
    } catch (error) {
        done(error, false);
    }
}));