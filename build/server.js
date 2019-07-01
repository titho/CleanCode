"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const postController_1 = require("./controllers/postController");
const Posts = __importStar(require("./controllers/postController"));
const loginController_1 = require("./controllers/loginController");
const registerController_1 = require("./controllers/registerController");
require("./config/passport");
const swaggerDoc = require('../swagger.json');
const passportJWT = passport_1.default.authenticate("jwt", { session: false });
const passportLocal = passport_1.default.authenticate("local", { session: false });
const app = express_1.default();
const port = +(process.env.PORT || 3000);
mongoose_1.default.connect(String(process.env.DB_HOST));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDoc));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use("/api/users", passportJWT, postController_1.PostController);
app.use("/api/login", passportLocal, loginController_1.LoginController);
app.use("/api/register", registerController_1.RegisterController);
app.use('/api/posts', passportJWT, Posts.getAllPosts);
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
