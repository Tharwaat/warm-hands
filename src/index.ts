import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import { createConnection } from "typeorm";
import { authRoutes } from "./api/auth/auth.routes";
import { userRoutes } from "./api/user/user.routes";
import { scheduleRoutes } from "./api/schedule/schedule.routes";
import { port } from "./config/config";
import { errors } from "celebrate";

async function initDB() {
    try {
        await createConnection();
        console.log("Connected To DB");
    } catch (error) {
        throw error;
    }

}

function startServer() {
    try {
        const app = express();
        const router = express.Router();
        
        router.use("/auth", authRoutes);
        router.use("/users", userRoutes);
        router.use("/schedule", scheduleRoutes);
        
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use(errors());
        app.use("/api", router);
        app.use(express.static("public"));
        
        app.set('view engine', 'ejs');
        
        app.get('/signin', (req, res) => {
            const isWrongCredentials = req.app.get("wrongCredentials");
            res.render('signin', {isWrongCredentials});
        });

        app.get('/patient/home', (req, res) => {
            res.render('patienthome', {foo: 'FOO'});
        });

        app.get('/user/home', (req, res) => {
            res.render('userHome', {foo: 'FOO'});
        });

        app.listen(port, () => {
            console.log("Server is running on port:", port);
        });
    } catch (error) {
        throw error;
    }
}

initDB().then(() => {
    startServer();
});