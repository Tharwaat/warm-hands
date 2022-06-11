import * as dotenv  from "dotenv";

dotenv.config();

const port = process.env.PORT || 8080;

export {
    port,
}