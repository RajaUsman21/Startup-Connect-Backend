import express from 'express'
import { connectionDB } from './db/config.js';
import syncDB from './db/init.js';
import allRoutes from './routes/index.js';


const app = express();
app.use(express.json())
connectionDB();
syncDB();
app.use(allRoutes)


app.listen( 3005, ()=>{
    console.log('server running on 3005')
});