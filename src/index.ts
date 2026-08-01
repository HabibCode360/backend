import express, { type Express, type Response, type Request } from "express";
import apiRouter from "./routes/index.js";
import cors from "cors";
import connectDB from "./config/dbConnect.js";

connectDB();

const PORT = process.env.PORT || 5000;

export const server: Express = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors({ origin: "http://localhost:5173" }));
server.use(
  "/api",
  (req, res, next) => {
    console.log("Request received from origin:", req.body);
    next();
  },
  apiRouter
);

server.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

if (!process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default server;