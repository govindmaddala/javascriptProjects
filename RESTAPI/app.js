const express = require('express');
const http = require('https');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const mongoose = require('mongoose')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(express.static("public"));
mongoose.connect('mongodb://127.0.0.1:27017/wikiDB')

const articleSchema = mongoose.Schema({
    title: String,
    content: String
})

const Article = mongoose.model("Article", articleSchema)

/*_________________________Targetting whole documents_____________________________*/


/*        Routing get, post and delete separately        */

// app.post('/articles',(req,res)=>{
//     const content = new Article({
//     title:req.body.title,
//     content:req.body.content
//     })
//     content.save((err)=>{
//         if(!err){
//             res.send(" Data is added");          // => to send a response after posting
//         }else{
//             res.send(err);
//         }
//     });
//     // res.redirect('/articles')
// })

// app.get('/articles',(req,res)=>{
//     Article.find((err,data)=>{
//         if(!err){
//             // res.render("list",{items:data})            => to render onto UI through HTML 
//             res.send(data)                             // => to send onto UI directly
//         }
//     })
// })

// app.delete('/articles',(req,res)=>{
//     Article.deleteMany((err)=>{
//         !err?res.send('Data is deleted'):res.send(err)
//     })
// })


/*_________________________Targetting whole documents_____________________________*/


/*              Routing get, post and delete using app.route()        */


app.get('/',(req,res)=>{
    res.redirect('/articles')
})


app.route('/articles')
    .get((req, res) => {
        Article.find((err, data) => {
            if (!err) {
                //res.render("list",{items:data})            // => to render onto UI through HTML 
                res.send(data)                             // => to send onto UI directly
            }
        })
    })
    .post((req, res) => {
        const content = new Article({
            title: req.body.title,
            content: req.body.content
        })
        content.save((err) => {
            if (!err) {
                res.send(`${req.body.title} is added`);          // => to send a response after posting
            } else {
                res.send(err);
            }
        });
        // res.redirect('/articles')
    })
    .delete((req, res) => {

        Article.deleteMany((err) => {
            !err ? res.send('Data is deleted') : res.send(err)
        })
    })








/*_________________________Targetting specific documents_____________________________*/


/*              Routing get, post and delete using app.route()       */


app.route('/articles/:articleTitle')
    .get((req, res) => {
        Article.findOne({ title: req.params.articleTitle }, (err, foundData) => {
            if (!err) {
                res.send(foundData)
            } else {
                res.send(err)
                res.send("Data is not found")
            }
        })


    })
    .post((req, res) => {

    })
    .delete((req, res) => {
        Article.deleteOne({ title: req.params.articleTitle }, (err, foundData) => {
            if (!err) {
                res.send(foundData)
            } else {
                res.send(err)
            }
        })

    })
    .put((req, res) => {
        Article.updateOne({ title: req.params.articleTitle }, { content: req.body.content }, (err, updatedData) => {
            if (!err) {
                res.send(updatedData)
            } else {
                res.send(err)
            }
        })

    })
    .patch((req, res) => {
        Article.updateOne({ title: req.params.articleTitle }, { content: req.body.content }, (err, updatedData) => {
            if (!err) {
                res.send(updatedData)
            } else {
                res.send(err)
            }
        })

    })

/*  Any space in link can be replaced with %20  and for more read mdn url encoded docx*/
app.listen(3000)