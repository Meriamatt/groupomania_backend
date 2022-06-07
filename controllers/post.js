const Post = require('../models/post');
const fs = require('fs');


exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new Post({
        ...postObject,
        likes: 0,
        usersLiked: [],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        date: new Date(Date.now())
    });

    post.save()
        .then(() => res.status(201).json({
            message: 'publication enregistrée !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({
        _id: req.params.id
    }).then(
        (post) => {
            res.status(200).json(post);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifyPost = (req, res, next) => {
    const postId = req.params.id;
    console.log(req.body);
    if (req.file) {

        Post.findById(postId) // search the post which its id = prodId
            .then((post) => {

                const filename = post.imageUrl.split("/images/")[1];
                const sentImageUrl = `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
            }`;
                console.log(sentImageUrl);
                fs.unlink(`images/${filename}`, () => {
                    Post.updateOne({
                            _id: postId
                        }, {
                            ...JSON.parse(req.body.post),
                            _id: postId,
                            imageUrl: sentImageUrl,
                            date: new Date(Date.now()),
                        })
                        .then(() => res.status(200).json({
                            message: "objet modifié"
                        }))
                        .catch((err) => res.status(400).json(err));
                });
            })
            .catch((err) => res.status(500).json(err));
    } else {
        Post.updateOne({
                _id: postId
            }, {
                ...req.body,
                _id: postId,
            })
            .then(() => res.status(200).json({
                message: "objet modifié"
            }))
            .catch((err) => res.status(400).json(err));
    }
};

exports.deletePost = (req, res, next) => {
    Post.findOne({
            _id: req.params.id
        })
        .then(post => {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.deleteOne({
                        _id: req.params.id
                    })
                    .then(() => res.status(200).json({
                        message: 'Publication supprimée !'
                    }))
                    .catch(error => res.status(400).json({
                        error
                    }));
            });
        })
        .catch(error => res.status(500).json({
            error
        }));
};

exports.getAllPosts = (req, res, next) => {
    Post.find().then(
        (posts) => {
            res.status(200).json(posts);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.likePost = (req, res, next) => {
    const {
        userId,
        isLiked
    } = req.body
    Post.findOne({
            _id: req.params.id
        })
        .then(post => {
            let newUsersLiked = post.usersLiked
            if (isLiked) {
                if (post.usersLiked.includes(userId)) {
                    newUsersLiked.splice(newUsersLiked.indexOf(userId), 1)
                } else {
                    newUsersLiked.push(userId);
                }
            }  else {
                if (post.usersLiked.includes(userId)) {
                    newUsersLiked.splice(newUsersLiked.indexOf(userId), 1)
                } 
            }
            Post.updateOne({
                    _id: req.params.id
                }, {
                    likes: newUsersLiked.length,
                    usersLiked: newUsersLiked,
                    isLiked: isLiked
                })
                .then(() => res.status(200).json({
                    message: 'Objet modifié !'
                }))
                .catch(error => res.status(400).json({
                    error
                }));


        })
};