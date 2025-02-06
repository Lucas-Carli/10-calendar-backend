const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Find user by email, if exists, show the message
        let user = await User.findOne({ email });

        // If exist, show message
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'User exists with this email'
            });
        }

        // If it does not exist, I create a new user instance
        user = new User(req.body);

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // Save async mode
        await user.save();

        // Generate our JWT
        const token = await generateJWT(user.id, user.name);

        // Show the message of new user. by console
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })


        // If something fails, catch error and show message 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the admin'
        });
    }

}

const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Find user by email, if exists, show the message
        let user = await User.findOne({ email });

        // If exist, show message
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User don`t exists with this email'
            });
        }

        // Confirm passwords
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password'
            })
        }

        // Generate our JWT
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })


        // If something fails, catch error and show message 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the admin'
        });
    }

};

const revalidateToken =  async (req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    // Generate a new JWT and return in this request
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
};


module.exports = {
    createUser,
    loginUser,
    revalidateToken

};