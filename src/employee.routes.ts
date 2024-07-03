import  * as express from 'express';
import * as mongodb from 'mongodb';
import { collections } from './database';

// create a router
export const  employeeRouter = express.Router();

//converts incoming body into json
employeeRouter.use(express.json());

//retrieve many employees
employeeRouter.get('/', async (req, res) => {
    try{
        const employees = await collections.employees.find({}).toArray();
        res.status(200).send(employees);
    }catch(error){
        console.error(error);
        res.status(500).send(error.message)
    }
})

//retrieve required employee with filter
employeeRouter.get('/:id', async (req, res) => {
    try{
        const id = req?.params?.id;
        const query = {_id: new mongodb.ObjectId(id)};
        const employee = await collections.employees.findOne({query});

        if(employee){
            res.status(200).send(employee);
        }else{
            res.status(404).send(`Failed to find an employee: Id ${id}`)
        }
    }catch(error){
        console.error(error);
        res.status(404).send(`Failed to find an employee: Id  ${req?.params?.id}`)
    }
})

// to insert data
employeeRouter.post('/', async (req, res) => {
    try{
        const employee = req.body;
        const result = await collections.employees.insertOne(employee)
                
        if(result.acknowledged){
            res.status(201).send(`created a new employee: ID ${result.insertedId}`)
        }else{
            res.status(500).send("Failed to create a new employee")
        }
    }catch(error){
        console.error(error);
        res.status(400).send(error.message)
    }
})

//to update existing data
employeeRouter.post('/:id', async (req, res) => {
    try{
        const id = req?.params?.id;
        const employee = req.body;
        const query = {_id: new mongodb.ObjectId(id)};
        const result = await collections.employees.updateOne(query, {$set: employee})
                
        if(result && result.matchedCount){
            res.status(201).send(`updated an employee: ID ${id}`)
        }else if(!result.matchedCount){
            res.status(404).send(`Failed to find an employee : ID ${id}`)
        }else{
            res.status(304).send(`Failed to update an employee : ID ${id}`)
        }
    }catch(error){
        console.error(error);
        res.status(400).send(error.message)
    }
})

//to delete existing data
employeeRouter.delete('/:id', async (req, res) => {
    try{
        const id = req?.params?.id;
        const employee = req.body;
        const query = {_id: new mongodb.ObjectId(id)};
        const result = await collections.employees.deleteOne(query);
                
        if(result && result.deletedCount){
            res.status(202).send(`deleted an employee: ID ${id}`)
        }else if(!result){
            res.status(400).send(`Failed to delete an employee : ID ${id}`)
        }else{
            res.status(404).send(`Failed to find an employee : ID ${id}`)
        }
    }catch(error){
        console.error(error.message);
        res.status(400).send(error.message)
    }
})