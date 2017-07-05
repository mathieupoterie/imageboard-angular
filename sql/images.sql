DROP TABLE IF EXISTS images, comments, hashtags;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS hashtags;

CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    image VARCHAR(300) NOT NULL,
    username VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    likes INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    image_id INTEGER REFERENCES images (id),
    name VARCHAR(300) NOT NULL,
    comments VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hashtags(
    id SERIAL PRIMARY KEY,
    image_id INTEGER REFERENCES images (id),
    hashtag VARCHAR(300)
);
--
-- INSERT INTO images (image, username, title, description) VALUES ('/uploads/pic1.jpg', 'Capiscine', 'Tempelhof from the outside 1', 'This photo was shot during the visit of the Tempelhof airport.');
-- INSERT INTO hashtags (image_id, hashtag) VALUES ('1', '#capiscine #blackandwhite #2017 #tempelhof #airport #Berlin');
-- INSERT INTO images (image, username, title, description) VALUES ('/uploads/pic2.jpg', 'Capiscine', 'Berlin : Prenzlauer Berg Cemetery', 'I made this photo two years ago after in Berlin.');
-- INSERT INTO hashtags (image_id, hashtag) VALUES ('2', '#capiscine #blackandwhite #2015 #cemetery #Berlin');
-- INSERT INTO images (image, username, title, description) VALUES ('/uploads/pic3.jpg', 'Capiscine', 'Berlin, Treptower Park', 'This is a winter pictures of this impressive park.');
-- INSERT INTO hashtags (image_id, hashtag) VALUES ('3', '#capiscine #blackandwhite #2017 #treptower #park #Berlin');
-- INSERT INTO images (image, username, title, description) VALUES ('/uploads/pic4.jpg', 'Capiscine', 'Les suspendus, 1', 'I made this pictures in London, back in 2015 !');
-- INSERT INTO hashtags (image_id, hashtag) VALUES ('4', '#capiscine #blackandwhite #2015 #London #shop #suspendus');
-- INSERT INTO images (image, username, title, description) VALUES ('/uploads/pic5.jpg', 'Capiscine', 'From a field perspective', 'I printed out this pictures in Björn Albert photo laboratory. It was an amazing experience !');
-- INSERT INTO hashtags (image_id, hashtag) VALUES ('5', '#capiscine #blackandwhite #2016 #field #nature #printed');
-- INSERT INTO images (image, username, title, description) VALUES ('/uploads/pic8.jpg', 'Capiscine', 'London 2014!', 'This photo brings back lot of great memories, one one my first anaolg picture!.');
-- INSERT INTO hashtags (image_id, hashtag) VALUES ('6', '#capiscine #blackandwhite #2014 #London');
-- INSERT INTO images (image, username, title, description) VALUES ('/uploads/pic9.jpg', 'Capiscine', 'London Lake', 'This is a 2014 pictures, really wintery !');
-- INSERT INTO hashtags (image_id, hashtag) VALUES ('7', '#capiscine #blackandwhite #2014 #London #lake');
-- INSERT INTO images (image, username, title, description) VALUES ('/uploads/pic11.jpg', 'Capiscine', 'Tempelhof from the inside', 'his photo was shot during the visit of the Tempelhof airport.');
-- INSERT INTO hashtags (image_id, hashtag) VALUES ('8', '#capiscine #blackandwhite #2017 #tempelhof #airport #hall');
-- INSERT INTO images (image, username, title, description) VALUES ('/uploads/pic12.jpg', 'Capiscine', 'Juliano!', 'My guitarist friend very talented!.');
-- INSERT INTO hashtags (image_id, hashtag) VALUES ('9', '#capiscine #blackandwhite #2016 #France #alaplaj');
-- INSERT INTO images (image, username, title, description) VALUES ('/uploads/pic13.jpg', 'Capiscine', 'Sea details', 'This photo brings back so many great memories.');
-- INSERT INTO hashtags (image_id, hashtag) VALUES ('10', '#capiscine #blackandwhite #2015 #sea #nature');
-- INSERT INTO images (image, username, title, description) VALUES ('/uploads/pic14.jpg', 'Capiscine', 'Tempelhof Corridor', 'This Tempelhof visit was really impressive !');
-- INSERT INTO hashtags (image_id, hashtag) VALUES ('11', '#capiscine #blackandwhite #2017 #tempelhof #airport #corridor');
-- INSERT INTO images (image, username, title, description) VALUES ('/uploads/pic15.jpg', 'Capiscine', 'Tempelhof from the outside 1', 'This photo was shot during the visit of the Tempelhof airport.');
-- INSERT INTO hashtags (image_id, hashtag) VALUES ('12', '#capiscine #blackandwhite #2017 #tempelhof #airport #Berlin');
-- INSERT INTO images (image, username, title, description) VALUES ('/uploads/merlin.JPG', 'Mathieu', 'First pic with my cat !', 'This photo was shot in January 2017, with my lovely cat, Merlin!');
-- INSERT INTO hashtags (image_id, hashtag) VALUES ('13', '#kitty #cute #2017 #animal');
