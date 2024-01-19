// eslint-disable-next-line no-undef
const express = require('express');
const cors = require('cors')
const zod= require('zod')
const jwt = require('jsonwebtoken')
const {schema} = require("./db.cjs");
const JWT_KEY = 'secretKey'
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt');
const saltRounds = 2

const app = express()
app.use(express.json()) // not including this statement wasted 2 fucking days of my lifeeeee on this project
app.use(cors())

const port = 4001

const verifyRole = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).json({ msg: 'Unauthorized' });
    } else {
        try {
            const decoded = jwt.verify(token, JWT_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(403).json({ msg: 'Forbidden' });
        }
    }
};

app.post('/signup', async (req, res) => {
    const type = zod.object({
        name: zod.string(),
        email: zod.string().email(),
        pass: zod.string().min(3)
    });

    const bodyData = type.safeParse(req.body);
    console.log(bodyData)
    if (!bodyData.success){
        res.send({msg: 'invalid inputs (min password length: 3)'});
        return;
    }

    try {
        const existingUser = await schema.findOne({ email: req.body.email });

        if (existingUser) {
            res.send({msg: 'email already exists'});
        } else {

            //hashing
            bcrypt.genSalt(saltRounds, (err, salt) => {
                if (err) {
                    // Handle error
                    console.error('Error generating salt:', err);
                    return;
                }

                bcrypt.hash(req.body.pass, salt, async (err, hash) => {
                        if (err) {
                            // Handle error
                            console.error('Error hashing password:', err);
                            return;
                        }

                    await schema.create({
                        name: req.body.name,
                        email: req.body.email,
                        pass: hash
                    })
                })

            });
            console.log('signup schema create')
            res.json({ msg: 'user created successfully' });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/login' , async (req , res) => {
    const type = zod.object({
        email: zod.string().email() ,
        pass: zod.string().min(3)
    })

    const bodyData = type.safeParse(req.body)
    if(bodyData.success) {
        //match login pass with hash stored in db
        const user = await schema.findOne({ email: req.body.email })
        console.log(user)
            if (!user) {
                // User not found
                res.send({msg:'no email like this in our db'})
                return;
            } else {
                bcrypt.compare(req.body.pass, user.pass , (err, result) => {
                    if (err) {
                        console.error('Error comparing passwords:', err);
                        return;
                    }

                    if (result) {
                        const token = jwt.sign(req.body.email , JWT_KEY)
                        res.status(200).send({msg:"you're in successfully" , token : token})
                    } else {
                        res.send({msg:'something you entered seems wrong'})
                    }
            })

            }


    } else {
        res.send({msg: 'no one like you exists till now'})
    }

})

app.get('/about', verifyRole, (req, res) => {
    res.json({ msg: 'Welcome to the About page!', user: req.body.token });
});

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
};
const sendEmail = async (to , subject , text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sarthak.mailbot@gmail.com',
            pass: 'yrnc qzxj dzib yzpb'
        }
    });

    const mailOptions = {
        from: 'sarthak.mailbot@gmail.com',
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully.');
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
};

const otp = generateOTP();
var ee = ''
app.post('/otp', async (req, res) => {
    const userEmail = req.body.email;
    ee = userEmail
    const ve = await schema.findOne({email : userEmail})
    if(ve){
        await sendEmail(userEmail, 'Your OTP for password reset', `Your OTP is: ${otp}`);

        // Create a token (optional)
        const token = jwt.sign({ userEmail, otp }, 'yourSecretKey');

        res.json({token: token, msg: 'OTP sent' , otp : otp});
    } else {
        res.send({msg : 'that email is not in db'})
    }

});

app.post('/verify-otp' , (req , res) => {
    let userOTP = req.body.otp
    if(userOTP == otp){
        res.send({msg : 'otp validated'})
    } else {
        res.send({msg: 'wrong otp'})
    }
})

app.post('/new-pass' , async (req , res) => {
    const newPass = req.body.newPass
    console.log(ee)

    try {
            //hashing
            bcrypt.genSalt(saltRounds, (err, salt) => {
                if (err) {
                    // Handle error
                    console.error('Error generating salt:', err);
                    return;
                }

                bcrypt.hash(newPass, salt, async (err, hash) => {
                    if (err) {
                        // Handle error
                        console.error('Error hashing password:', err);
                        return;
                    }

                    await schema.updateOne({
                        email: ee
                    } , {pass: hash})
                })

            });
            res.status(200).send({msg : "password changed successfully"})

    } catch (error) {
        console.error('Error updating password', error);
        res.status(500).send('Internal Server Error');
    }

})

console.log('started')


app.listen(port , () => {
    console.log('listening on port ' + port)
})
