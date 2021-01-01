const router = require('express').Router();
const tagsController = require('../controllers/tags');

router.post('/', tagsController.createTag);

router.get('/', tagsController.getAllTags);

router.delete('/:tagId', tagsController.deleteTag);

module.exports = router;