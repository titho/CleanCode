import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import { PostController } from './controllers/postController';
import * as Posts from './controllers/postController';
import { LoginController } from './controllers/loginController';
import { RegisterController } from './controllers/registerController';
import './config/passport';

const swaggerDoc = require('../swagger.json');

const passportJWT = passport.authenticate("jwt", { session: false });
const passportLocal = passport.authenticate("local", { session: false });

const app: express.Application = express();
const port: number = +(process.env.PORT || 3000);

mongoose.connect(String(process.env.DB_HOST));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", passportJWT, PostController);
app.use("/api/login", passportLocal, LoginController);
app.use("/api/register", RegisterController);
app.use('/api/posts', passportJWT, Posts.getAllPosts);

app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});