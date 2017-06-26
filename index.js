const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/database');


var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '_' + Math.floor(Math.random() * 99999999) + '_' + file.originalname);
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        filesize: 2097152
    }
});

app.use(require('body-parser').urlencoded({
    extended: false
}));


app.use('/public', express.static(__dirname + `/public`));
app.use('/uploads', express.static(__dirname + `/uploads`));


app.post('/uploadImageFromAngular', uploader.single('file'), function(req, res) {
    var fileName = "/uploads/" + req.file.filename;
    var user = req.body.user;
    var title = req.body.title;
    var description = req.body.description;
    var hashtags = req.body.hashtag;


    if (req.file) {
        db.addImage(fileName, user, title ,description).then(function(results){
                var imageId = results[0].id;
                db.postHashtag(imageId, hashtags).then(function(results){
                }).catch(function(e){
                    console.log(e);
                })
        }).catch(function(e){
            console.log(e, "error!");
        })
        res.json({
            success : true,
            file : "/uploads/"+ req.file.filename
        })

    } else {
        res.json({
            success: false
        });
    }
});

app.get('/images', function(req, res){

    var limit = req.query.limit;
    var offset = req.query.offset;
    db.getImages(limit, offset).then(function(results){

        if (results) {
            var results = results.rows.sort(function(a, b){
                return new Date(b.created_at)- new Date(a.created_at);
            })
            results.forEach(function(img){
                if (img.hashtag === null) {
                    img.hashtag = "";
                }else {
                    img.hashtag = img.hashtag.split(' ');
                }
            })
            res.json({
                success : true,
                file : results
            })

        } else {
            res.json({
                success: false
            });
        }

    })
})

app.get('/single', function(req, res){

    db.getSingleImage(req.query.id).then(function(results){
        if (results) {
            var data = results.rows[0];

            if(data.hashtag === null){
                data.hashtag = "";
            }else {
                data.hashtag = data.hashtag.split(' ');
            }

            res.json({
                success : true,
                file : data
            })
        } else {
            res.json({
                success: false
            });
        }

    })
})

app.get('/hashtag', function(req, res){
    var hashtag = "%" + req.query.hashtag + "%";
    console.log(hashtag);

    db.getHashtaggedImages(hashtag).then(function(results){
        if (results) {
            results.rows.forEach(function(img){
                if (img.hashtag === null) {
                    img.hashtag = "";
                }else {
                    img.hashtag = img.hashtag.split(' ');
                }
            })
            res.json({
                success : true,
                file : results.rows
            })
        } else {
            res.json({
                success: false
            });
        }

    })
})

app.get('/comments', function(req, res){
    var limit = req.query.limit;
    var offset = req.query.offset;



    db.getComments(req.query.id, limit, offset).then(function(results){


        if (results.rows[0]) {
            var results = results.rows.sort(function(a, b){
                return new Date(b.created_at)- new Date(a.created_at);
            })
            res.json({
                success : true,
                file : results
            })
        } else {

            res.json({
                success: false
            });
        }
    })
})


app.post('/comment', function(req, res){

    var user = req.body.user;
    var comment = req.body.comment;
    var imageId = req.body.imageId;

    db.postComment(imageId, user, comment).then(function(results){
        console.log("these are the results postComment", results);

        if (results) {
            res.json({
                success : true,
                file : results
            })

        } else {
            console.log("Please fill both user and comments field!");
            res.json({
                success: false
            });
        }
    }).catch(function(e){
        console.log("errror catched", e);

    });
})


app.post('/singleLike', function(req, res) {

    var imageId = req.body.imageId;
    var numberOfLikes = req.body.likes;
    db.likeImage(numberOfLikes, imageId).then(function(results) {
        var data = results.rows[0];
        res.json({
            success : true,
            file : data
        })
    }).catch(function(err) {
        console.log(err);
    });

});


app.get('/upload', function(req,res){
    res.sendFile(__dirname + "/public/app/index.html")
})


app.get('*', function(req, res){
    res.sendFile(__dirname + "/public/app/index.html");
})


app.listen(8080, function() {
    console.log("listening");
})
