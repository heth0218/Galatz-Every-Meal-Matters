const express = require('express')
const router = express.Router()
const User = require('../models/User')
const util = require('util');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken') 
const auth = require('../middleware/auth');
const hasRoles = require('../middleware/roles')
var connection = require('../database.js');
const e = require('express');


//Register a User

router.post('/register', [
    check('name', 'Please enter a name').not().isEmpty(),
    check('email', 'Enter a valid email address').isEmail(),
    check('password', 'Please enter a valid password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({
            errors: errors.array()
        })
    }

    const { name, email, password } = req.body;

    try {
        //Write sql query for findOne
        //JSON response
        const query = util.promisify(connection.query).bind(connection);

        const sql = await query("SELECT * FROM user WHERE email = '" + email + "'")
        console.log("results from: ",sql);
        // res.send(sql[0])

        if (sql.isLength == 0) {
            return res.status(400).json({
                msg: 'User already exists'
            })
        }
        
        let payloadUser ={ 
            name:name, 
            email:email, 
            password:password
            }
        const salt = await bcrypt.genSalt(10);
        console.log("paylodname: ",payloadUser.name)
        payloadUser.password = await bcrypt.hash(password, salt);
        var valuesInsert = [[payloadUser.name,payloadUser.email,payloadUser.password]]
        console.log("valuesInsert : ",valuesInsert)
        var insertQuery = "INSERT INTO user (name, email,password) VALUES ?";
        connection.query(insertQuery, [valuesInsert], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
          });

        const findUser = await query("SELECT * FROM user WHERE email = '" + payloadUser.email + "'")
        console.log("results from: ",findUser);
      
        // let user = await User.findOne({ email });
        // if (user) {
        //     return res.status(400).json({
        //         msg: 'User already exists'
        //     })
        // }
        // U dont need this in sql
        // user = new User({ name, email, password });
        //payload creation 
        // let payload={
            // name, email, password
        // }
        // const salt = await bcrypt.genSalt(10);
        // replace user.password with payload.password
        // user.password = await bcrypt.hash(password, salt);

        

//replace this line with the insertion code below
        // await user.save();
//SQL query to insert new user in db 
        //INSERT DATA FROM LINE 26 IN DB 
        // INSERT INTO USER()
// VALUES(name, email,password)

//Learn usage of async await in mysql with nodejs

//Find the recently inserted user in db
// SELECT * FROM USER WHERE userEmail=email
// assign this to a variable x 



// replace the user.id down to x.id
//commenting everything after this
        // const payload = {
        //     user: {
        //         id: user.id 
        //     }
        // }

        const payload = {
            user: {
                id: findUser[0].userId 
            }
        }
        console.log(payload);

        jwt.sign(payload, config.get('jwtSecret'),
            {
                expiresIn: '1h'
            }
            ,
            (err, token) => {
                if (err) throw err;
                res.json({ token, findUser })
            })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
})


//Logging in the already registered user
router.post('/login', [
    check('email', 'Please enter a valid email id').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            errors: errors.array()
        })
    }
    const { email, password } = req.body;

    try {
        const query = util.promisify(connection.query).bind(connection);
        let u = await query("SELECT * FROM user WHERE email = '" + email + "'")
        //change findone with find query through email in sql
        //let user = await User.findOne({ email });
        console.log("loggin ",u)
        if (u.isLength==0) {
            return res.status(400).json({
                msg: 'User not found'
            })
        }

        const isMatch = await bcrypt.compare(password, u[0].password);
        
        if (!isMatch) {
            return res.status(400).json({
                msg: 'Incorrect password entered'
            })
        }

        const payload = {
            user: {
                id: u[0].userId
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token, user:u[0] })
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg: 'Server Error'
        })

    }
})

//Update user
router.put('/:id', auth, async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        let userSql = await query("SELECT * FROM user WHERE userId = '" + req.params.id + "'")
        if (userSql.length==0) {
            return res.status(400).json({
                msg: 'User not found'
            })
        }
        else {
            var id= req.params.id;
            var updateData=req.body;
            var sql = `UPDATE user SET ? WHERE userId= ?`;
            connection.query(sql, [updateData, id], function (err, data) {
            if (err) throw err;
            console.log(data.affectedRows + " record(s) updated");
            res.status(201).send("user updated")
        });
        }
        let user1 = await query("SELECT * FROM user WHERE userId = '" + req.params.id + "'")
        console.log("user1 : ",user1)
        // const user1 = await User.findById(req.params.id)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            msg: 'Server Error'
        })
    }
})

//Delete the existing user
//remove hasRoles
//
router.delete('/delete', auth, async (req, res) => {
    try{
        const query = util.promisify(connection.query).bind(connection);
        console.log(res.locals.user);
        const sql = await query("DELETE FROM user WHERE userId = '" + res.locals.user.userId + "'")
        console.log("Number of records deleted: " + sql.affectedRows);
    }
    catch (error) {
        console.log(error);
    }
    
})

/*
router.delete('/delete', auth, hasRoles(['heth']), async (req, res) => {
    console.log(res.locals.user._id)
    const deletedUser = await User.findByIdAndDelete(res.locals.user._id);
    res.status(200).send({
        msg: 'User deleted',
        deletedUser
    })
})
*/

router.get('/', auth, async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        console.log("res.locals.user: ",res.locals.user)
        const user = await query("SELECT userId, name, email, date, contact, address, currentTotal, roles FROM user WHERE userId = '" + res.locals.user.userId + "'")
        //const user = await User.findById(res.locals.user.userId).select('-password')
        res.json(user[0]);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "Server error" })
    }
})

module.exports = router