import * as express from "express";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";
import { authRoutes } from "./api/auth/auth.routes";
import { userRoutes } from "./api/user/user.routes";
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
        
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use(errors());
        app.use("/api", router);

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