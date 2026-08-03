import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import hackathonRoutes from "./routes/hackathonRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import joinRequestRoutes from "./routes/joinRequestRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/hackathons", hackathonRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/teams", joinRequestRoutes);
app.use("/api/submissions", submissionRoutes);


app.get("/" , (req,res)=>{
    res.end("Hello from server...");
})






export default app;