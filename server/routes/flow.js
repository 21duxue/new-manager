const Router = require('koa-router')
const MessageController = require('../controllers/flow');

const router = new Router({
    prefix: '/api/v1'
})

/**
 * 文章接口
 */
// 创建文章接口（路由）
router.post('/flow-create', MessageController.create);
// 创建文章接口（路由）
router.post('/upload', MessageController.uploadimg);
// 获取文章详情接口（路由）
router.get('/flow', MessageController.detail);
// 获取列表接口（路由）
router.get('/flow-list', MessageController.list);

router.delete('/flow-delete/:id', MessageController.delete);

router.post('flow-update/:id', MessageController.update);

module.exports = router
