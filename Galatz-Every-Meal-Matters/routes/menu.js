const express = require('express');
const MenuItems = require('../models/MenuItems');
const router = express.Router();
const hasRoles = require('../middleware/roles')
const auth = require('../middleware/auth');
const util = require('util');
var connection = require('../database.js') // to establish a connection with sql

//Add a menu Item
router.post('/', auth, async (req, res) => {

    try{

        let payloadUser ={ 
            body:req.body
            }   
        console.log("name of menu item: ",payloadUser.body.name)
        const query = util.promisify(connection.query).bind(connection);
        let userSql = await query("SELECT * FROM menuItems WHERE name = '" + payloadUser.body.name + "'")
        if (userSql.length>0) {
            return res.status(400).json({
                msg: 'Menu item already exists'
            })
        }
        else{
            // const menuItem = await MenuItems(req.body).save();
            var valuesInsert = payloadUser.body
            //converting the json object to an array
            var lowTotal = [];
            for(item in valuesInsert){
            lowTotal.push(valuesInsert[item]);
            }
            var lowTotal = [lowTotal]
            console.log("lowTotal: ",lowTotal)
            //inserting the values obtained into the DBs
            var insertQuery = "INSERT INTO menuItems (name,cost,image, description, restaurant) VALUES ?";
            connection.query(insertQuery, [lowTotal], function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
                res.status(200).send({
                    msg: 'New item created'
                })
            });


        }
    }catch (error) {
        console.log(error.message);
        res.status(500).send({
            msg: 'Server Error'
        })
    }
    //console.log(menuItem);
    
})

//Get menu item according to the restaurant 
router.get('/:id', async (req, res) => {
    let payloadUser ={ 
        body:req.body
        }
    const query = util.promisify(connection.query).bind(connection);
    const sql = await query("SELECT * FROM menuItems WHERE restaurant = '" + req.params.id + "'")
    console.log("sql output: ",sql)
    // const menus = await MenuItems.find({ restaurant: req.params.id });

    res.status(200).send({
        menus:sql
    })

})

//Update a menu Item
//router.put('/:id', auth, hasRoles(['admin']), async (req, res) => {
router.put('/:id', auth, async (req, res) => {
    
        try {
            const query = util.promisify(connection.query).bind(connection);
            let userSql = await query("SELECT * FROM menuItems WHERE menuItemsId = '" + req.params.id + "'")
            if (userSql.length==0) {
                return res.status(400).json({
                    msg: "The Menu Item not found"
                })
            }
            else {
                var id= req.params.id;
                var updateData=req.body;
                var sql = `UPDATE menuItems SET ? WHERE menuItemsId= ?`;
                connection.query(sql, [updateData, id], function (err, data) {
                if (err) throw err;
                console.log(data.affectedRows + " record(s) updated");
                res.status(201).send("menuItems updated")
            });
            }
            let user1 = await query("SELECT * FROM menuItems WHERE menuItemsId = '" + req.params.id + "'")
            console.log("user1 : ",user1)
            // const user1 = await User.findById(req.params.id)
    
        } catch (error) {
            console.log(error.message);
            res.status(500).send({
                msg: 'Server Error'
            })
        }
    })
        
    // const menu = await MenuItems.findByIdAndUpdate(req.params.id,
    //     { $set: req.body },
    //     { new: true }
    // )
    // res.status(201).send({
    //     msg: 'Updated Item is here',
    //     menu
    // })

//Delete a menu item
// router.delete('/:id', auth, hasRoles(['admin']), async (req, res) => {
//     const menu = await MenuItems.findByIdAndDelete(req.params.id);
//     res.status(201).send({
//         msg: 'Menu item successfully deleted',
//         menu
//     })
// }
router.delete('/:id', auth, async (req, res) => {
    try{
        const query = util.promisify(connection.query).bind(connection);
        const sql = await query("DELETE FROM menuItems WHERE menuItemsId = '" + req.params.id + "'")
        console.log("Number of records deleted: " + sql.affectedRows);
        res.send({
            msg:'Item deleted'
        })
    }
    catch (error) {
        console.log(error);
    }
    
})

module.exports = router