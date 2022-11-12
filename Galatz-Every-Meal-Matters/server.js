const express = require('express'); 
const app = express();
const cors=require('cors');

app.use(cors());
app.use(express.json());
var connection = require('./database.js')
app.use(express.json());


app.get('./',function(req,res){
    let sql = "SELECT COUNT(*) FROM restaurant"
    console.log("here")
    connection.query(sql,function(err,results){
        if (err)throw err;
        res.send(results);
    });
}); 

//Apis for different schemas
app.use('/api/users', require('./routes/users'));
app.use('/api/restaurant', require('./routes/restaurant'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/cart', require('./routes/cart'));

const PORT = 8020;

app.listen(PORT, () => {
    console.log(`Listening to post ${PORT}`)
    connection.connect(function(err){
        if(err) throw err;
        console.log("database connected");

        // let sql = "SELECT COUNT(*) FROM restaurant"
        // connection.query(sql,function(err,results){
        //     if (err)throw err;
        //     console.log("results: ",results);
        // });
    })
})

module.exports = app;