import express from 'express'
import dotenv from 'dotenv'
import routes from './routes/index.js'
import  cors from 'cors'
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'
const app = express();
const PORT = process.env.PORT || 4000;


// middleware
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"))
app.use(routes);
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));





app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})