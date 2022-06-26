import * as express from "express";
import * as bodyParser from "body-parser";
import * as userService from "./services/user/user.service";
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
        
        app.get('/signup', (req, res) => {
            res.render('signup');
        });

        app.get('/signup/serviceprovider', (req, res) => {
            res.render('serviceprovider');
        });

        app.get('/signup/serviceprovider/daycare', (req, res) => {
            res.render('registerdaycare');
        });

        app.get('/signup/serviceprovider/caregiver', (req, res) => {
            res.render('registercaregiver');
        });

        app.get('/signup/registerp', (req, res) => {
            res.render('registerp');
        });

        app.get('/signup/registerv', (req, res) => {
            res.render('registerv');
        });

        app.get('/signin', (req, res) => {
            const isWrongCredentials = req.app.get("wrongCredentials");
            res.render('signin', {isWrongCredentials});
        });

        app.get('/patient/home', async (req, res) => {
            const user = req.app.get("user");
            if (!user) res.redirect('/signin');
            const caregivers = await userService.fetchAllUsers("caregiver");
            const daycares = await userService.fetchAllUsers("daycare");
            const volunteers = await userService.fetchAllUsers("volunteer");
            //console.log("CG: ", caregivers, " DC: ", daycares, " V: ", volunteers);
            res.render('patienthome', {caregivers, daycares, volunteers});
        });

        app.get('/user/home', (req, res) => {
            const user = req.app.get("user");
            if (!user) res.redirect('/signin');
            res.render('servicehome', {user});
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