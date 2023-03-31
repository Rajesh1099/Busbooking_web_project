const router = require('express').Router();
const User = require("../models/usersmodel")
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

router.use(session({
    secret: 'your_key',
    resave: false,
    saveUninitialized: false
}));


router.post("/register", async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.send({
                message: "User already exists",
                success: false,
                data: null
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            message: "user created succesfully",
            success: true,
            data: null
        })
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
            data: null
        });

    }
});

router.post('/login',
    passport.authenticate('local', { failureRedirect: "/", failureFlash: true }),
    function (req, res) {
        res.send({
            message: "User logged in successfully",
            success: true,
            data: null
        })
    });

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async function (email, password, done) {

        try {
            const result = await collection.findOne({ email: email });
            console.log(result);
            user = result;
            if (user == null) {
                return res.send({
                    message: "User already exist",
                    success: false,
                    data: null
                });

            }
            if (!bcrypt.compareSync(password, result.password)) {
                return res.send({
                    message: "password incorrect",
                    success: false,
                    data: null
                });
            }
            return done(null, user);
        } catch (error) {
            console.error(error);
        }
    }
));



module.exports = router;