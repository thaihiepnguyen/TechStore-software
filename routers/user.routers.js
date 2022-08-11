const express = require("express");
const bodyParser = require("body-parser")
const userModel = require("../model/user.models");
const app = express();
app.use(bodyParser.json())

app.get('/login', (req, res) => {
  res.render('user/login')
})

app.get('/signup', (req, res) => {
  res.render('user/signup')
})

app.post('/api/register', async (req,res) => {
    const user = new userModel(req.body)

    try {
        await user.save()
        res.send(user)
    }catch(error) {
        res.status(500).send(error)
    }
})

app.get("/users", async (request, response) => {
    const users = await userModel.find({});

    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });

module.exports = app