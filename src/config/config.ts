import * as dotenv  from "dotenv";

dotenv.config();

const port = process.env.PORT || 8080;
const key = process.env.KEY;

export {
    port,
    key,
}