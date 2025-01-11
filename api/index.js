import express from  "express" ;
import mongoose from  "mongoose" ;
import morgan from  "morgan";
import cors from  "cors" ;
import helmet from 'helmet';
import cookieParser from "cookie-parser";
import userRoute from './router/user.js';
import formRouter from './router/form.js';
import dotenv from  "dotenv" ;
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("common"));
app.use(helmet());


async function mongoDB(){
    try {
    await mongoose.connect(process.env.MONGO_URL);
    
    if (process.env.NODE_ENV !== 'production') {
        console.log('MongoDB is connected');
     }
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.log('MongoDB not connected:', error);
        }
    };

};
mongoDB();

app.use(cors({
    origin: "https://library-web-backend.onrender.com", 
    methods: ["GET", "POST"],
    credentials:true,
  }));

 app.use('/api/user',userRoute)  ;
 app.use('/api/form',formRouter);



app.all('*',(req,res)=>{
    return res.send('OOPS something wrong!');
});

const PORT=process.env.PORT || 5004
app.listen(PORT,()=>{
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Server running on http://localhost:${PORT}`);
    }
});
