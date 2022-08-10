const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://doananhduong:duong1234@cluster0.lgai80j.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);
client.connect();

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function createCustomer(client, newCustomer) {
    const res = await client.db('TechStore').collection('Account').insertOne(newCustomer);
    console.log(`New customer created with the following id: ${res.insertedId}`);
}
async function findCustomer(client, name) {
    const res = await client.db('TechStore').collection('Account').find(name);
    if(err) {
        console.log('Cannot find any account');
    }
    else {
        console.log(`Find account with id: ${res}`);
    }
    return res;
}
        // await createCustomer(client, {
        //     username: "doananhduong",
        //     password: "duong1234",
        //     gmail: "doananhduong09.10@gmail.com",
        //     address: Object({
        //         st: "Huynh Tan Phat",
        //         city :"Ho Chi Minh",
        //         country: "Viet Nam"
        //     }),
        //     phone: "0973822287",
        //     gender: "M",
        //     dob: new Date("01/01/2000"), //error
        //     creditCard: Object({
        //         cardId: 9704229211508648,
        //         name_on_card: "DOAN ANH DUONG",
        //         expire: new Date("01/2024"), //error
        //         cvv: 241
        //     })
        // });
        

