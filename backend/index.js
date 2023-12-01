const express=require('express');

const app=express();
const mongo=require('./db/connect.js');
const port=5000;


app.use(express.json());

app.use('/api/auth',require('./routes/signup.js'));
app.use('/api/auth',require('./routes/login.js'))

app.listen(port,()=>{
    mongo();
    console.log(`Notes on Cloud backend running on http://localhost:${port}`);
})