const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin , User , Course} = require('../db')
const router = Router();
const jwt = require('jsonwebtoken');
const {jwt_secret} = require("../config");

// Admin Routes
router.post('/signup', async(req, res) => {
    //  admin signup 

    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username : username,
        password : password
    })
    res.json({
        message : 'Admin created successfully!'
    })
});

router.post('/signin', async(req, res) => {
    //  admin signup 

    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({
        username, password
    })
    if(user){
        const token = jwt.sign({
            username
        } , jwt_secret);
        res.json({
            
            token
        })
       
    } else{
        res.status(411).json({
            message : "Invalid Username/Password"
        })
    }

   

});

router.post('/courses', adminMiddleware, async(req, res) => {
    //  course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({
        title,description,imageLink,price
    })
    res.json({
        message: "Course created Successfully!" , courseId : newCourse._id 
    })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    //  fetching all courses 

    const response = await Course.find({})
        res.json({courses : response})
    
    
});

module.exports = router;