const express = require('express')
const router = express.Router()
const Restaurant = require('../models/Restaurant')
const hasRoles = require('../middleware/roles')
const auth = require('../middleware/auth');
var connection = require('../database.js')
const util = require('util');

//Register a new restaurant- done
router.post('/', auth, async (req, res) => {
    const { name } = req.body;
    const query = util.promisify(connection.query).bind(connection);
    let sql= await query('SELECT * FROM restaurant where name like ?','%'+name+'%');
    //const restaurant = await Restaurant.findOne({ name });

    if (sql.length>0) {
        return res.status(500).send({
            msg: 'The restaurant already exists'
        })
    }
    
    try {
        var valuesInsert = req.body
        //converting the json object to an array
        var lowTotal = [];
        counter = 0
        for(item in valuesInsert){
        if (counter!=6){
        lowTotal.push(valuesInsert[item]);
        }
        counter+=1
        }
        var lowTotal = [lowTotal]
        console.log("lowtotal: ",lowTotal)
        //inserting the values obtained into the DB
        var insertQuery = "INSERT INTO restaurant (name,description,email,address,contact,isAvailable,starRating,type,image) VALUES ?";
       
        connection.query(insertQuery, [lowTotal], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
            res.status(200).send({
                msg: 'Action successful',
            })
          });
    
        //console.log(menuItem);
        // const restaurant = await Restaurant(req.body).save();

    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }

})

//Get all restaurants from the db -> Done
router.get('/', async (req, res) => {
    const query = util.promisify(connection.query).bind(connection);

    const sql = await query("SELECT * FROM restaurant")
    console.log("sql: ",sql)
    //const restaurants = await Restaurant.find({});

    if (!sql) {
        return res.send.status(400).send({
            msg: 'No restaurnat found in the db',
        })
    }

    return res.status(201).send(sql)

})

//Delete a restaurant - Done

router.delete('/:id', auth, async (req, res) => {
    console.log("req.params.id: ",req.params.id)
    const query = util.promisify(connection.query).bind(connection);
    
    try{
        const sql = await query("SELECT * FROM restaurant WHERE restaurantid = '" + req.params.id + "'")
        restName = sql[0].name
        const sql1 = await query("DELETE FROM restaurant WHERE restaurantId = '" + req.params.id + "'")
    }
    catch (error) {
        return res.status(400).send({
            msg: "No such restaurant found in the db"
        })
    }

    res.status(201).send({
        msg: `Restaurant deleted with name ${restName}`
    })
})


//Get a single restaurant -Done
router.get('/:id', async (req, res) => {
    const query1 = util.promisify(connection.query).bind(connection);
    // const restaurant = await Restaurant.findById(req.params.id);
    let flavour="salty"
    let number=20
    const sql1 = await query1(`SELECT restaurant.name, menuItems.description FROM restaurant JOIN menuItems ON restaurant.restaurantId = menuItems.restaurant WHERE menuItems.description like '%${flavour}%' AND (SELECT AVG(Cost) FROM menuItems m2 WHERE m2.restaurant=restaurant.restaurantId )>${number} ORDER BY menuItems.description ASC`)
    console.log(sql1.length)

    const query = util.promisify(connection.query).bind(connection);
    // const restaurant = await Restaurant.findById(req.params.id);
    const sql = await query("SELECT * FROM restaurant WHERE restaurantid = '" + req.params.id + "'")
    console.log("sql: ",sql)
    if (sql.length>0)
    {
        res.status(201).send(sql)
    }
    else{
    return res.status(400).send({
            msg: 'Restaurant details not available'
        })
    }
})

//Update a detail of a restaurant 

router.put('/:id', auth, async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let userSql = await query("SELECT * FROM restaurant WHERE restaurantId = '" + req.params.id + "'")
        if (userSql.length==0) {
            return res.status(400).json({
                msg: "The restaurant not found"
            })
        }
        else {
            var id= req.params.id;
            var updateData=req.body;
            var sql = `UPDATE restaurant SET ? WHERE restaurantId= ?`;
            connection.query(sql, [updateData, id], function (err, data) {
            if (err) throw err;
            console.log(data.affectedRows + " record(s) updated");
            res.status(201).send("restaurant updated")
        });
        }
        let user1 = await query("SELECT * FROM restaurant WHERE restaurantId = '" + req.params.id + "'")
        console.log("user1 : ",user1)
        // const user1 = await User.findById(req.params.id)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            msg: 'Server Error'
        })
    }
})

// router.put('/:id', auth, async (req, res) => {

//     const restaurant = await Restaurant.findById(req.params.id);

//     if (!restaurant) {
//         return res.status(400).send({
//             msg: "The restaurant not found"
//         })
//     }

//     const hell = await Restaurant.findByIdAndUpdate(
//         req.params.id,
//         { $set: req.body },
//         { new: true })

//     res.json(hell)

// })

// router.put('/:id', auth, hasRoles(['admin']), async (req, res) => {

//     const restaurant = await Restaurant.findById(req.params.id);

//     if (!restaurant) {
//         return res.status(400).send({
//             msg: "The restaurant not found"
//         })
//     }

//     const hell = await Restaurant.findByIdAndUpdate(
//         req.params.id,
//         { $set: req.body },
//         { new: true })

//     res.json(hell)

// })

//search - done
router.get('/search/:search',async(req,res)=>{
    try {
        
        console.log("req.params.search:  ",req.params.search);
    const query = util.promisify(connection.query).bind(connection);
    // newName = "restaurant400"
    let x= await query('SELECT * FROM restaurant where name like ?','%'+req.params.search+'%');
    // console.log(x); 
    res.send(x)
    // const sql = await query("SELECT * FROM restaurant WHERE name = '" + name + "'")
    } catch (error) {
        return res.send(error)
    }
})


//writing advanced query number 1
// con.connect(function(err) {
//     if (err) throw err;
//     var sql = "SELECT restaurant.name, menuItems.description FROM restaurant JOIN menuItems ON restaurant.restaurantId = menuItems.restaurantId ORDER BY menuItems.description ASC LIMIT 15";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//     });
//   });

module.exports = router;