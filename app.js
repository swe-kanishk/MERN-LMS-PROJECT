import express from 'express';
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';


app.use(express.json());

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}));

app.use(cookieParser());
app.use(morgan('dev'))

app.use('/ping', (req, res)=>{
    res.send('Pong');
});

// routes of 3 modules  
app.all('*', (req, res) => {
    res.status(404).send('OOPS! 404 page not found');
});

export default app;