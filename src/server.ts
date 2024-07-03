import * as dotenv from  'dotenv';
import cors from 'cors';
import  express from 'express';
import { connectToDatabase } from './database';
import { employeeRouter } from './employee.routes';

//loads the environment variables
dotenv.config();

const  {DB_URL} = process.env;

if(!DB_URL){
    console.error(" No DB_URL environment variable has been declared")
    process.exit(1);
}

connectToDatabase(DB_URL)
.then(() => {
    const app = express();
    app.use(cors());

    // register backend api endpoints
    app.use("/employees", employeeRouter);

    app.listen(5200, () => {
        console.log(`server is running at http://localhost:5200.....`)
    })
}).catch(error => console.error(error));