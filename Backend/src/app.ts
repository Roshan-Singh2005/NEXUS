import express from 'express';
import {authRouter} from './routes/auth.route';
import cookieParser from 'cookie-parser';
 
const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/auth", authRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
