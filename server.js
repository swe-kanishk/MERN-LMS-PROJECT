import { config } from "dotenv";
config();
import app from "./app.js";
import dbConnection from "./config/dbConnection.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async ()=>{
    await dbConnection();
    console.log(`App is running at http://localhost:${PORT}`);
});