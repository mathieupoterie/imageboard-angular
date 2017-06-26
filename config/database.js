var spicedPg = require('spiced-pg');
var password = require('./password')


// IS THAT OKAy ?
var dbUrl = process.env.DATABASE_URL ||`postgres:${password.id}:${password.password}@localhost:5432/images`;
var db = spicedPg(dbUrl);



function addImage(image, username, title, description){
    return new Promise(function(resolve, reject){
        const q = `INSERT INTO images (image, username, title, description)
        VALUES ($1, $2, $3, $4)
        RETURNING * ;`
        ;

        const params = [image, username, title, description];
        return db.query(q, params).then(function(results){
            resolve(results.rows);
        }).catch(function(e){
            reject(e);
        });
    })
}

function likeImage(numberOfLikes, imageId) {
    return new Promise(function(resolve, reject) {
        const q = 'UPDATE images SET likes = $1 WHERE id = $2 RETURNING *;';
        let params = [numberOfLikes,imageId];
        db.query(q, params).then(function(results) {
            resolve(results);
        }).catch(function(err) {
            reject(err);
        });
    });

}



function getImages(limit, offset){
    return new Promise(function(resolve, reject){
        const q = `SELECT images.id, images.username, images.image, images.title, images.description, images.created_at, hashtags.hashtag FROM images
        LEFT OUTER JOIN hashtags
        ON images.id = hashtags.image_id
        ORDER BY images.created_at DESC
        LIMIT $1 OFFSET $2;`
        ;

        const params = [limit, offset || null]
        return db.query(q, params).then(function(results){

            resolve(results);
        }).catch(function(e){
            reject(e);
        });
    })
}

// SELECT * FROM TableA
// FULL OUTER JOIN TableB
// ON TableA.name = TableB.name;

function getSingleImage(imageId){
    return new Promise(function(resolve, reject){
        const q = `SELECT images.id, images.likes, images.username, images.image, images.title, images.description, images.created_at, hashtags.hashtag
        FROM images
        JOIN hashtags ON  images.id = hashtags.image_id
        WHERE images.id = $1;`
        ;
        const params = [imageId]
        return db.query(q, params).then(function(results){
            resolve(results);
        }).catch(function(e){
            reject(e);
        });
    })
}

function getHashtaggedImages(hashtag){
    return new Promise(function(resolve, reject){
        const q = `SELECT images.id, images.username, images.image, images.title, images.description, images.created_at, hashtags.hashtag
        FROM images
        JOIN hashtags  ON  images.id = hashtags.image_id
        WHERE hashtags.hashtag LIKE $1;`
        ;
        const params = [hashtag]

        return db.query(q, params).then(function(results){
            console.log(results, "results");
            resolve(results);
        }).catch(function(e){
            reject(e);
        });
    })
}


function getComments(imageId, limit, offset){

    return new Promise(function(resolve, reject){
        const q = `SELECT *
        FROM comments
        WHERE image_id = $1
        ORDER BY comments.created_at DESC
        LIMIT $2 OFFSET $3;`
        ;
        const params = [imageId, limit, offset || null]
        return db.query(q, params).then(function(results){
            resolve(results);
        }).catch(function(e){
            reject(e);
        });
    })
}


function postComment(imageId, username, comment){

    return new Promise(function(resolve, reject){
        const q = `INSERT INTO comments (image_id, name, comments)
        VALUES ($1, $2, $3)
        RETURNING * ;`
        ;

        const params = [imageId, username || null, comment || null];
        return db.query(q, params).then(function(results){
            resolve(results.rows);
        }).catch(function(e){
            reject(e);
        });
    })
}

function postHashtag(imageId, hashtag){

    return new Promise(function(resolve, reject){
        const q = `INSERT INTO hashtags (image_id, hashtag)
        VALUES ($1, $2)
        RETURNING * ;`
        ;

        const params = [imageId, hashtag];
        return db.query(q, params).then(function(results){
            resolve(results.rows);
        }).catch(function(e){
            reject(e);
        });
    })
}

module.exports.addImage = addImage;
module.exports.getImages = getImages;
module.exports.getSingleImage = getSingleImage;
module.exports.getComments = getComments;
module.exports.postComment = postComment;
module.exports.postHashtag = postHashtag;
module.exports.getHashtaggedImages = getHashtaggedImages;
module.exports.likeImage = likeImage;
