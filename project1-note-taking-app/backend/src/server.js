import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import "dotenv/config";
import { connectionDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js";
const app = express();

app.use(express.json());
app.use(rateLimiter);
app.use((req, res, next) =>  {
    console.log(`request method is ${req.method} and request url is ${req.url}`)
    next()
}
)
app.use("/api/notes", notesRoutes);
const port = process.env.PORT || 3000


connectionDB().then(() => {
    app.listen(3000, ()=> console.log("server is listening on port", process.env.PORT))
})



