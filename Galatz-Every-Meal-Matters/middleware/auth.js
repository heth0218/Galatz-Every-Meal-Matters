const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
var connection = require('../database.js')
const util = require('util');

module.exports = async (req, res, next) => {
    //Get the token from the header

    const token = req.header('Authorization');

    //Check if not token

    if (!token) {
        return res.status(401).json({ msg: 'No token ,authorization denied' });
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'))
    // console.log("d",decoded);
    const query = util.promisify(connection.query).bind(connection);

    const user = await query("SELECT * FROM user WHERE userId = '" + decoded.user.id + "'")
    // console.log("decoded.user.id")
    // console.log(user)
    //const user = await User.findById(decoded.user.id)
    console.log(user);
    res.locals.user = user[0]
    next();

    // } catch (err) {
    //     res.status(401).json({ msg: 'Token is not valid' })
    // }
}