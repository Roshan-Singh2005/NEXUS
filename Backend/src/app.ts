import express from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.route";
import { chatRouter } from "./routes/chat.routes";
import { authMiddleware } from "./middleware/auth.middleware";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/auth", authRouter);
app.use("/chat", authMiddleware, chatRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});