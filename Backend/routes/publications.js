const router = require('express').Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const publicationCtrl = require('../controllers/publications');

router.get('/', auth, publicationCtrl.getAllPublication);
router.post('/', auth, multer, publicationCtrl.createPublication);
router.get('/:id', auth, publicationCtrl.getOnePublication);
router.put('/:id', auth, multer, publicationCtrl.modifyPublication);
router.delete('/:id', auth, publicationCtrl.deletePublication);
router.post("/:id/like", auth, publicationCtrl.likePublication);

module.exports = router;