const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}

const app = express();
const port = 8000;

//Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use(express.static('static')) // For serving static files
app.use(express.urlencoded({extended: true}));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug','html') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory


app.get('/',(req,res)=>{
    res.status(200).render(path.join('home.pug'));
});


app.get('/contact',(req,res)=>{
    res.status(200).render(path.join('contact.pug'));
});

app.post('/contact',(req,res)=>{
    if (req.method === 'POST') {
        var myData = new Contact(req.body);
        myData.save();
        res.status(200).render(path.join('formSubmission.pug'));
    }else{
        res.status(200).render(path.join('home.pug'))
    }

});

//START THE SERVER 
app.listen(port,()=>{
    console.log(`Running on server with port ${port}`);
 });