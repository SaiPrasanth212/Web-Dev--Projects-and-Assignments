const path = require('path');
const User = require('../models/user')

exports.showForm = (req,res,next)=>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
}

exports.submitForm = (req,res,next)=>{
    const data = req.body
    console.log("submitting form data: ",data)
    User.create({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone
    }).then((data)=>{
        res.json(data)
    }).catch(e=>{
        console.log("error while creating ",e)
    })   
}

exports.getAllUsers = (req,res,next)=>{
    User.findAll()
    .then(data=>{
        res.json(data)
    }).catch(e=>{
        console.log(e)
    })
}

exports.removeUserById = (req,res,next)=>{
    console.log("user to delete ",req.params,"body : ",req.body)
    User.findByPk(req.params.id).then(user=>{
        return user.destroy()
    }).then((d)=>{
        res.json(d)
    }).catch(e=>{
        console.log(e)
    })
}