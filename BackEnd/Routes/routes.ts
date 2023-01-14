const productApp = require('express')
const ProductController = require('../Controller/product')
const router = productApp.Router();

router.get('/getAll', ProductController.findAll);
router.get('/:id', ProductController.findOne);
router.post('/', ProductController.create);
router.patch('/:id', ProductController.update);
router.delete('/:id', ProductController.destroy);

module.exports = router