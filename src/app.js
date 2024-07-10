import express from 'express'
import { connectionDB } from './db/config.js';
import syncDB from './db/init.js';
import allRoutes from './routes/index.js';
import cors from "cors"
// import { uploadSingle } from './middleware/multer.js';


const app = express();
app.use(cors())
app.use(express.json())
connectionDB();
syncDB();

// Example route using multer middleware
// app.post('/user/profile', uploadSingle('profilePic'), (req, res) => {
//     // Handle the uploaded file here
//     if (!req.file) {
//         return res.status(400).send('No files were uploaded.');
//     }

//     // Example response
//     return res.status(200).json({
//         message: 'File uploaded successfully',
//         filePath: req.file.path  // Send back the path of the uploaded file if needed
//     });
// });

app.use(allRoutes)


app.listen( 3005, ()=>{
    console.log('server running on 3005')
});