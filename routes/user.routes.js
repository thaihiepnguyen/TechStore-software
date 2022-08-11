const express = require("express");
const bodyParser = require("body-parser")
const User = require("./../model/user.models");
const app = express();
app.use(bodyParser.json())

// app.get('/login', (req, res) => {
//   res.render('user/login')
// })

// app.get('/signup', (req, res) => {
//   res.render('user/signup')
// })

app.post('/api/register', async (req,res) => {
    // try {
    //     const response = await User.create(req.body)
    //     console.log(response)
    //     res.send(response)
    // }catch(error) {
    //     res.status(500).send(error)
    // }
    console.log(req.body)
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