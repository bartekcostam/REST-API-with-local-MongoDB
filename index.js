const express = require('express');
const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/reg")


const app = express()
app.use(express.json())


const userShema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String
})


const User = new mongoose.model("users", userShema)


app.post('/register', async(req, res) => {
    let user = new User(req.body)
    let result = await user.save()
    res.send(result)
})

app.get('/users', async(req, res) => {
    try{
        const users = await User.find(req.body)
        res.json(users)
    }
    catch(err){
        console.log(err)
    }
})

app.listen(5000)