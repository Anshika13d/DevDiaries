const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs')
const Post = require('./model/post')
const { dirname } = require('path')

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json())
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))

mongoose.connect('mongodb://127.0.0.1:27017/user')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const saltRounds = 10;
const secret = "ekfhahpohqbnfknnmvmbegohqeorflkkae62on"

app.post('/signup', async (req, res) => {
    const {username, email, password} = req.body;
    
    try{
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPass = await bcrypt.hash(password, salt);

        const userDoc = await User.create({
            username,
            email,
            password:hashedPass,
        })
        res.json({userDoc});
    }
    catch(e){
        res.status(400).json(e)
    }
    
})

app.post('/login', async (req, res)  =>{
    const { username, password } = req.body;

    const userDoc = await User.findOne({ username });

    if (!userDoc) {
        return res.status(400).json({ message: 'User not found' });
    }

    const isOk = await bcrypt.compare(password, userDoc.password);
    
    if(isOk){
        jwt.sign({username, id:userDoc._id}, secret, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            });
        });
    }
    else{
        res.status(400).json("wrong credentials")
    }
    
})

app.get('/profile', (req, res) =>{
    const {token} = req.cookies;
    //console.log(req.cookies); 
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
      }
    jwt.verify(token, secret, {}, (err, info) =>{
        if(err) throw err;

        res.json(info);
    })
})

app.post('/logout', (req, res) =>{
    res.cookie('token','').json('ok');
})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file

    //renaming the file to store it in /uplaods
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath)

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if(err) throw err
        const {title, summary, content,} = req.body
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author:info.id,
        })

        res.json(postDoc)
    })

    
})

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if(req.file){
        const { originalname, path } = req.file

        //renaming the file to store it in /uplaods
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath)
    }
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if(err) throw err
        const {id, title, summary, content,} = req.body
        const postDoc = await Post.findById(id)
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)
        if(!isAuthor){
            return res.status(400).json('you are not the author')
        }

        postDoc.title = title;
        postDoc.summary = summary;
        postDoc.content = content;
        if (newPath) {
            postDoc.cover = newPath;
        }
        await postDoc.save();

        res.json(postDoc)
    })
})

app.get('/post', async (req, res) => {
    res.json(await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
    );
})

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id)
        .populate('author', ['username'])

    res.json(postDoc)
})

app.get('/edit/:id', async (req, res) => {
    const {id} = req.params;
    res.json(id);
})


const PORT = 3000;

app.listen(PORT, console.log("Server Started"))