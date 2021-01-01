const Tags = require('../models/tags');
const Tag = require('../models/tags');

exports.createTag = (req, res, next) => {
    const { tagName, tagColor } = req.body;
    const userId = req.userId;
    const tag = new Tag(tagName, tagColor, userId);
    tag.createTag()
    .then(data => {
        res
        .status(201)
        .json({
            "message": "Tag created successfully"
        });
    })
    .catch(err => {
        const error = new Error(err);
        err.status = 400;
        next(error);
    });
}

exports.getAllTags = (req, res, next) => {
    const userId = req.userId;
    Tag.getAllTags(userId)
    .then(data => {
        res
        .status(200)
        .json(data);
    })
    .catch(err => {
        const error = new Error(err);
        error.status = 400;
        next(error);
    });
}

exports.deleteTag = (req, res, next) => {
    const userId = req.userId;
    const tagId = req.params.tagId;
    Tag.deleteTagById(userId, tagId)
    .then(data => {
        res
        .status(200)
        .json({
            'message': 'Tag deleted successfully'
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.status = 400;
        next(error);
    });
}