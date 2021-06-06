const pool = require('../database')
const redis = require('redis')
const client = redis.createClient()

exports.createPost = async (req, res) => {
    try {
        const { postname, description } = req.body;
        console.log(req.user)
        const newPost = {
            postname,
            description,
            createdBy: req.user.UserId
        }
        const post = await pool.query("INSERT INTO POSTS SET ?", [newPost])

        if (post) {
            res.status(201).send({ message: "Post created sucessfully", post });
        }
    } catch (e) {
        res.status(500).send(e)
        console.log(e);
    }
}

exports.getPostById = async (req, res) => {
    try {
        const postId = req.params.id

        client.get(postId, async (err, result) => {
            if (err) {
                console.log(err);
                throw err;
            }

            if (result) {
                res.status(200).send({ post: JSON.parse(result) })
            }
            else {
                const post = await pool.query("SELECT * FROM POSTS WHERE postId=?", [postId])
                if (post) {
                    await client.setex(postId, 3600, JSON.stringify(post))
                    res.status(200).send({
                        post
                    })
                }
            }
        })
    } catch (e) {
        res.status(500).send(e)
        console.log(e)
    }
}

exports.getPosts = async (req, res) => {
    try {
        const posts = await pool.query("SELECT * FROM POSTS")
        if (posts) {
            res.status(200).send({
                posts
            })
        }
    } catch (e) {
        res.status(500).send(e)
        console.log(e)
    }
}

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id
        const createdBy = req.user.UserId
        const delpost = await pool.query("DELETE FROM POSTS WHERE postId=? AND createdBy=?", [postId, createdBy])
        console.log(delpost)
        if (delpost) {
            res.status(200).send({ message: "Post deleted" });
        }
    } catch (e) {
        res.status(500).send(e)
        console.log(e)
    }
}