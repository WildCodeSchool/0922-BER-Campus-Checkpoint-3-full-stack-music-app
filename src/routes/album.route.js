const Router = require('express').Router();

const { getAllAlbums, getAlbumById } = require('../controllers/album');

// Router.get("/", (req, res) => {
//   res.send("Test users Routes");
// });

Router.get('/', getAllAlbums);
Router.get('/:id', getAlbumById);
// Router.get("/:id/posts", getAllUserPosts);
// Router.get("/:id/comments", getAllUserComments);
// Router.delete("/id", deleteUser);
// Router.put("/:id", updateUser);
// Router.post("/", postUser);

module.exports = Router;
