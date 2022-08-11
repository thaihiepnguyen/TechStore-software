// const {MongoClient} = require('mongodb');
// const uri = 'mongodb+srv://doananhduong:duong1234@cluster0.lgai80j.mongodb.net/?retryWrites=true&w=majority';
// const client = new MongoClient(uri);
// client.connect();

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// async function createCustomer(client, newCustomer) {
//     const res = await client.db('TechStore').collection('Account').insertOne(newCustomer);
//     console.log(`New customer created with the following id: ${res.insertedId}`);
// }
// async function findCustomer(client, name) {
//     const res = await client.db('TechStore').collection('Account').find(name);
//     if(err) {
//         console.log('Cannot find any account');
//     }
//     else {
//         console.log(`Find account with id: ${res}`);
//     }
//     return res;
// }
//         // await createCustomer(client, {
//         //     username: "doananhduong",
//         //     password: "duong1234",
//         //     gmail: "doananhduong09.10@gmail.com",
//         //     address: Object({
//         //         st: "Huynh Tan Phat",
//         //         city :"Ho Chi Minh",
//         //         country: "Viet Nam"
//         //     }),
//         //     phone: "0973822287",
//         //     gender: "M",
//         //     dob: new Date("01/01/2000"), //error
//         //     creditCard: Object({
//         //         cardId: 9704229211508648,
//         //         name_on_card: "DOAN ANH DUONG",
//         //         expire: new Date("01/2024"), //error
//         //         cvv: 241
//         //     })
//         // });
        
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const userRouter = require("./routers/user.routers.js")
const Users = require('./model/user.models')

// or mongodb://localhost:27017/<database-name>
mongoose.connect('mongodb://127.0.0.1:27017/test');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});



const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/user', userRouter);


app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
  res.render('home.pug');
})

app.get('/product', (req, res) => {
  res.render('product.pug')
})

app.get('/cart', (req, res) => {
  res.render('cart.pug')
})

app.get('/checkout', (req, res) => {
  res.render('checkout.pug')
})

app.get('/user/login', (req, res) => {
  res.render('user/login.pug')
})

app.post('/user/login', async (req, res) => {
  console.log(req.body);
  await Users.create(req.body);
})

app.listen(2000, ()=> {
    console.log('Server is up at 2000')
})
