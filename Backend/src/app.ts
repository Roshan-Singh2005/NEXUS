import express from 'express';
import {authRouter} from './routes/auth.route';
import cookieParser from 'cookie-parser';
import {chatRouter} from './routes/chat.routes';
import {authMiddleware} from './middleware/auth.middleware';


const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/auth", authRouter);
app.use("/chat",authMiddleware, chatRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
