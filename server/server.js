import app from "./app.js";
import dotenv from "dotenv";
import connect from "./config/db.js";

dotenv.config();

await connect();

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server Running on ${PORT}`);
} );

