import express from 'express'
import mongoose from 'mongoose'
import { userModel } from './database/user.model.js'
import { todoModel } from './database/todo.model.js'

const app = express()

//middleware
app.use(express.json())

app.get('/health', (req,res)=>{
    res.status(200).json({"message": "working"})
})

//create user
app.post('/api/create', async (req,res)=>{
    try {
        const {email, password} = req.body
        if(!email)
            res.status(404).json({"message": "email required", "success": false} )
        if(!password)
            res.status(404).json({"message": "password required", "success": false} )
        const response = await userModel.create({email, password})
        res.status(201).json({"message": "user created", response})
    } catch (error) {
        res.status(404).json({"message": error.message, "success": false} )
    }
})

//login
app.post('/api/login', async (req, res)=>{
    try {
        const {email, password} = req.body
        if(!email)
            res.status(404).json({"message": "email required", "success": false} )
        if(!password)
            res.status(404).json({"message": "password required", "success": false} )
        const userdata = await userModel.findOne({email})
        if(!userdata)
            res.status(404).json({"message": "email invalid", "success": false} )
        if(!(userdata.password === password))
            res.status(404).json({"message": "password invalid", "success": false} )

        res.status(200).json({"message": "login success", "success": true} )
    } catch (error) {
        res.status(404).json({"message": error.message, "success": false} )
    }
})

//create todo
app.post('/todo/create', async (req,res)=>{
    try {
        const {title, email, isCompleted=false} = req.body
        if(!title)
            res.status(404).json({"message": "title required", "success": false} )
        const userdata = await userModel.findOne({email})
        if(!userdata)
            res.status(404).json({"message": "email invalid", "success": false} )

        const response = await todoModel.create({title, email, isCompleted, users: [userdata._id]})
        res.status(201).json({"message": "todo created", response})
    } catch (error) {
        res.status(404).json({"message": error.message, "success": false} )
    }
})

//create todo
app.post('/todo/get', async (req,res)=>{
    try {
        const {email} = req.body
        const userdata = await userModel.findOne({email})
        if(!userdata)
            res.status(404).json({"message": "email invalid", "success": false} )

        const response = await todoModel.find({users: [userdata._id]})
        res.status(200).json({"message": "todo fetched", response})
    } catch (error) {
        res.status(404).json({"message": error.message, "success": false} )
    }
})




const connect = mongoose.connect("mongodb://localhost:27017/todoapp").then(()=>{console.log('MONGODB CONNECTED')}).catch((err)=>{console.log(err.message)})

app.listen(3000, ()=>{
    if(connect)
        console.log(`http://localhost:3000/health`)
})