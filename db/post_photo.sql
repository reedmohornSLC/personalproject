INSERT INTO photos
(photourl,id)
values ($1, $2)
RETURNING photourl, id
