const pool = require('../database')

exports.createPost = async (req, res) => {
    try {
        const { postname, description } = req.body;
        const newPost = {
            postname,
            description,
            createdBy: req.user.UserId
        }
        const post = await pool.query("INSERT INTO POSTS SET ?", [newPost])

        if (post) {
            res.status(201).send("Post created sucessfully");
        }
    } catch (e) {
        res.status(500).send(e)
        console.log(e);
    }
}